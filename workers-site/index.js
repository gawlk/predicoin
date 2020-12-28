import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

addEventListener('fetch', (event) => {
    try {
        event.respondWith(handleEvent(event))
    } catch (e) {
        event.respondWith(new Response('Internal Error', { status: 500 }))
    }
})

async function handleEvent(event) {
    const request = event.request

    const url = new URL(request.url)

    if (url.pathname === '/api/fetch') {
        let KV_VALUES

        let KV_PREDICTIONS6H

        let KV_PREDICTIONS12H

        switch (url.searchParams.get('name').toLowerCase()) {
            case 'btc':
                KV_VALUES = BTC_VALUES
                KV_PREDICTIONS6H = BTC_PREDICTIONS6H
                KV_PREDICTIONS12H = BTC_PREDICTIONS12H
                break
            case 'eth':
                KV_VALUES = ETH_VALUES
                KV_PREDICTIONS6H = ETH_PREDICTIONS6H
                KV_PREDICTIONS12H = ETH_PREDICTIONS12H
                break
        }

        const dateFrom = new Date(url.searchParams.get('from'))

        const dateTo = new Date(url.searchParams.get('to'))

        const dates = []

        while (dateFrom <= dateTo) {
            dates.push(dateFrom.toJSON())
            dateFrom.setMinutes(dateFrom.getMinutes() + 10)
        }

        const obj = {
            values: {},
            predictions6h: {},
            predictions12h: {},
        }

        const getValues = async (dates, type) => {
            const days = {}

            const values = {}

            const currentDate = new Date()

            currentDate.setHours(
                currentDate.getHours() +
                    (type === 'predictions12h'
                        ? 12
                        : type === 'predictions6h'
                        ? 6
                        : 0)
            )

            const KV =
                type === 'values'
                    ? KV_VALUES
                    : type === 'predictions6h'
                    ? KV_PREDICTIONS6H
                    : KV_PREDICTIONS12H

            for (const date of dates) {
                if (new Date(date) <= currentDate) {
                    const [day, time] = date.split('T')

                    if (!days[day]) {
                        const result = await KV.get(day)
                        days[day] = JSON.parse(result) || {}
                    }

                    values[date] = days[day][time] || null
                } else {
                    values[date] = null
                }
            }

            return values
        }

        obj.values = await getValues(dates, 'values')

        obj.predictions6h = await getValues(dates, 'predictions6h')

        obj.predictions12h = await getValues(dates, 'predictions12h')

        return new Response(JSON.stringify(obj), {
            headers: {
                'Content-Type': 'application/json',
            },
        })
    } else {
        try {
            return await getAssetFromKV(event)
        } catch (e) {
            // if an error is thrown try to serve the asset at 404.html
            try {
                let notFoundResponse = await getAssetFromKV(event, {
                    mapRequestToAsset: (req) =>
                        new Request(`${new URL(req.url).origin}/404.html`, req),
                })

                return new Response(notFoundResponse.body, {
                    ...notFoundResponse,
                    status: 404,
                })
            } catch (e) {}

            return new Response(e.message || e.toString(), { status: 500 })
        }
    }
}
