<template>
    <canvas ref="chart" height="400" class="w-full"></canvas>
</template>

<script setup>
    import { computed, defineProps, onMounted, watch } from 'vue'

    ref: chart

    const color1 = 'rgb(244, 114, 182)'

    const color2 = 'rgb(159, 130, 228)'

    const color3 = 'rgb(96, 165, 250)'

    let chartObj

    const props = defineProps({
        values: Object,
        predictions6h: Object,
        predictions12h: Object,
    })

    const getData = () => {
        const toList = (obj) =>
            Object.keys(obj).map((key) => {
                return {
                    x: key,
                    y: obj[key] || NaN,
                }
            })

        const values = toList(props.values)

        const predictions6h = toList(props.predictions6h)

        const predictions12h = toList(props.predictions12h)

        const sameParams = {
            backgroundColor: 'transparent',
            pointBackgroundColor: 'transparent',
            pointBorderColor: 'transparent',
            borderJoinStyle: 'round',
        }

        const labels = Array.from(
            new Set([
                ...values.map((x) => x.x),
                ...predictions6h.map((x) => x.x),
                ...predictions12h.map((x) => x.x),
            ])
        ).sort()

        return {
            labels,
            datasets: [
                {
                    data: values,
                    borderColor: color1,
                    pointHoverBackgroundColor: color1,
                    pointHoverBorderColor: color1,
                    borderWidth: 5,
                    pointRadius: 8,
                    pointHoverRadius: 8,
                    pointHitRadius: 4,
                    ...sameParams,
                },
                {
                    data: predictions6h,
                    borderColor: color2,
                    pointHoverBackgroundColor: color2,
                    pointHoverBorderColor: color2,
                    borderWidth: 4,
                    pointRadius: 7,
                    pointHoverRadius: 7,
                    pointHitRadius: 3.5,
                    ...sameParams,
                },
                {
                    data: predictions12h,
                    borderColor: color3,
                    pointHoverBackgroundColor: color3,
                    pointHoverBorderColor: color3,
                    borderWidth: 3,
                    pointRadius: 6,
                    pointHoverRadius: 6,
                    pointHitRadius: 3,
                    ...sameParams,
                },
            ],
        }
    }

    watch(
        () => props.predictions12h,
        (values, oldValues) => {
            if (chartObj) {
                const data = getData()
                console.log(data)
                chartObj.data.labels = data.labels
                chartObj.data.datasets = data.datasets
                chartObj.update()
            }
        }
    )

    onMounted(() => {
        chartObj = new Chart(chart.getContext('2d'), {
            type: 'line',
            data: getData(),
            options: {
                layout: {
                    // padding: 20,
                },
                tooltips: {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    xPadding: 16,
                    yPadding: 12,
                    cornerRadius: 16,
                },
                legend: {
                    display: false,
                },
                scales: {
                    scaleLabel: {
                        display: false,
                    },
                    xAxes: [
                        {
                            gridLines: {
                                display: false,
                                drawBorder: false,
                            },
                            ticks: {
                                display: false,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            gridLines: {
                                display: false,
                                drawBorder: false,
                            },
                            ticks: {
                                display: false,
                            },
                        },
                    ],
                },
            },
        })
    })
</script>
