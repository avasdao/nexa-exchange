import { Link } from 'react-router-dom'

import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
} from 'victory'

import Header from '../components/Header'

import icon from '../../../assets/logo.png'

const data = [
    { month: 2, earnings: 13000 },
    { month: 3, earnings: 16500 },
    { month: 4, earnings: 14250 },
    { month: 5, earnings: 19000 },
    { month: 6, earnings: 18000 },
    { month: 7, earnings: 29000 },
]

const Stats = () => {
    return (
        <main>
            <section className="m-3">
                <h1 className="tracking-widest text-2xl font-bold text-gray-500 text-center opacity-50 uppercase">
                    Charts &amp; Graphs
                </h1>

                <h3 className="flex justify-center items-center text-gray-500 font-bold opacity-70">
                    33
                    <small className="ml-1 uppercase">members connected</small>
                </h3>

            </section>

            <section className="p-3 flex flex-row gap-2">

                <div className="mt-0 bg-gray-100 border-2 border-gray-500 rounded-lg">
                    <VictoryChart
                        domainPadding={20}
                    >
                        <VictoryAxis
                            // tickValues specifies both the number of ticks and where
                            // they are placed on the axis
                            tickValues={[2, 3, 4, 5, 6, 7]}

                            tickFormat={[
                                'Feb',
                                'Mar',
                                'Apr',
                                'May',
                                'Jun',
                                'Jul'
                            ]}
                        />

                        <VictoryAxis
                            dependentAxis
                            // tickFormat specifies how ticks should be displayed
                            tickFormat={(x) => (`$${x / 1000}k`)}
                        />

                        <VictoryBar
                            style={{
                              data: { fill: "tomato", opacity: 0.7 },
                              labels: { fontSize: 12 },
                              parent: { border: "1px solid #ccc", padding: 0, margin: 0, height: "50px" }
                            }}

                            data={data}
                            // data accessor for x values
                            x="month"
                            // data accessor for y values
                            y="earnings"
                        />
                    </VictoryChart>
                </div>

                <div className="mt-0 bg-gray-100 border-2 border-gray-500 rounded-lg">
                    <VictoryChart
                        domainPadding={20}
                    >
                        <VictoryAxis
                            // tickValues specifies both the number of ticks and where
                            // they are placed on the axis
                            tickValues={[2, 3, 4, 5, 6, 7]}

                            tickFormat={[
                                'Feb',
                                'Mar',
                                'Apr',
                                'May',
                                'Jun',
                                'Jul'
                            ]}
                        />

                        <VictoryAxis
                            dependentAxis
                            // tickFormat specifies how ticks should be displayed
                            tickFormat={(x) => (`$${x / 1000}k`)}
                        />

                        <VictoryBar
                            style={{
                              data: { fill: "tomato", opacity: 0.7 },
                              labels: { fontSize: 12 },
                              parent: { border: "1px solid #ccc", padding: 0, margin: 0, height: "50px" }
                            }}

                            data={data}
                            // data accessor for x values
                            x="month"
                            // data accessor for y values
                            y="earnings"
                        />
                    </VictoryChart>
                </div>

            </section>

        </main>
    )
}

export default Stats
