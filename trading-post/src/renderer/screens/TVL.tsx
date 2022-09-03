import Header from '../components/Header'

import {
    VictoryLabel,
    VictoryPie,
} from 'victory'

import icon from '../../../assets/logo.png'

const TVL = () => {
    return (
        <main>
            <section className="m-3">
                <h1 className="tracking-widest text-2xl font-bold text-gray-500 text-center opacity-50 uppercase">
                    Total Value Locked
                </h1>

                <h3 className="flex justify-center items-center text-gray-500 font-bold opacity-70">
                    33
                    <small className="ml-1 uppercase">item count</small>
                </h3>

            </section>

            <section>
                <svg viewBox="0 0 800 800">
                    <VictoryPie
                        standalone={false}
                        width={400} height={400}
                        data={[
                            { x: 1, y: 120 }, { x: 2, y: 150 }, { x: 3, y: 75 }
                        ]}
                        innerRadius={68} labelRadius={100}
                        style={{ labels: { fontSize: 20, fill: "white" } }}
                    />

                    <VictoryLabel
                        textAnchor="middle"
                        style={{ fontSize: 20 }}
                        x={200} y={200}
                        text="Pie!"
                    />
                </svg>
            </section>

        </main>
    )
}

export default TVL
