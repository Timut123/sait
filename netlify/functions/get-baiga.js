
const YANDEX_CONFIG = {
    clientId: "taxi/park/d10155282f724d5bbb0eb949cf78044d",
    apiKey: "biPDPImeKksmWvyCFWxSLhgsuslaHDDo",
    parkId: "d10155282f724d5bbb0eb949cf78044d"
};

const getDateRange = () => {
    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).toISOString();
    return { from: firstDay, to: lastDay };
};

exports.handler = async function(event, context) {
    // Настройки для разрешения доступа (CORS)
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json"
    };

    try {
        // 1. Получаем список работающих водителей
        const profilesResponse = await fetch('https://fleet-api.yandex.net/v1/parks/driver-profiles/list', {
            method: 'POST',
            headers: {
                'X-Client-ID': YANDEX_CONFIG.clientId,
                'X-API-Key': YANDEX_CONFIG.apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: { 
                    park: { id: YANDEX_CONFIG.parkId },
                    driver_profile: { work_status: ["working"] } 
                },
                limit: 30, 
                fields: {
                    driver_profile: ["id", "last_name", "first_name", "middle_name"]
                }
            })
        });

        if (!profilesResponse.ok) {
            throw new Error(`Yandex API Error: ${profilesResponse.statusText}`);
        }

        const profilesData = await profilesResponse.json();
        const drivers = profilesData.driver_profiles || [];

        // 2. Считаем деньги для каждого водителя
        const { from, to } = getDateRange();

        const leaderboardData = await Promise.all(drivers.map(async (driver) => {
            const fName = driver.driver_profile.first_name || "";
            const lName = driver.driver_profile.last_name || "";
            const fullName = `${lName} ${fName}`.trim();

            try {
                // Запрос транзакций
                const txResponse = await fetch('https://fleet-api.yandex.net/v2/parks/transactions/list', {
                    method: 'POST',
                    headers: {
                        'X-Client-ID': YANDEX_CONFIG.clientId,
                        'X-API-Key': YANDEX_CONFIG.apiKey,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query: {
                            park: { id: YANDEX_CONFIG.parkId },
                            driver_profile: { id: driver.driver_profile.id },
                            event_at: { from: from, to: to }
                        },
                        limit: 1000,
                        fields: ["amount"]
                    })
                });

                let totalIncome = 0;
                if (txResponse.ok) {
                    const txData = await txResponse.json();
                    if (txData.transactions) {
                        totalIncome = txData.transactions.reduce((acc, tx) => {
                            const val = parseFloat(tx.amount);
                            return val > 0 ? acc + val : acc; // Считаем только доход
                        }, 0);
                    }
                }

                return {
                    id: driver.driver_profile.id,
                    fullName: fullName,
                    amount: Math.floor(totalIncome),
                    city: "Алматы" // Город пока ставим Алматы по умолчанию
                };

            } catch (e) {
                return { id: driver.driver_profile.id, fullName, amount: 0, city: "Алматы" };
            }
        }));

        // 3. Сортируем (кто больше заработал - тот выше)
        leaderboardData.sort((a, b) => b.amount - a.amount);

        // 4. Отдаем результат сайту
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                almaty_astana: leaderboardData, 
                regions: []
            })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Server Error", details: error.message })
        };
    }
};