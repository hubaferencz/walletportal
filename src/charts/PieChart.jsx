import { useEffect, useState } from "react";
import { Pie } from "@visx/shape";
import { Group } from "@visx/group";
import { Text } from "@visx/text";
import formatNumber from "../utils/formatNumber";

export default function PieChart(props) {
  const [active, setActive] = useState(null);
  const width = 350;
  const half = width / 2;

  return (
    <>
      <div className="grow flex flex-col justify-center">
        <svg width={width} height={width} id="pieChart">
          <Group top={half} left={half}>
            <Pie
              data={props.coins}
              pieValue={(data) => data.amount * data.inUSD}
              outerRadius={half}
              innerRadius={({ data }) => {
                const size = active && active.symbol == data.symbol ? 12 : 8;
                return half - size;
              }}
              padAngle={0.01}
            >
              {(pie) => {
                return pie.arcs.map((arc) => {
                  return (
                    <g
                      key={arc.data.symbol}
                      onMouseEnter={() => setActive(arc.data)}
                      onMouseLeave={() => setActive(null)}
                    >
                      <path d={pie.path(arc)} fill={arc.data.color}></path>
                    </g>
                  );
                });
              }}
            </Pie>

            {active ? (
              <>
                <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
                  {`$${Math.floor(active.amount * active.inUSD)}`}
                </Text>

                <Text
                  textAnchor="middle"
                  fill={active.color}
                  fontSize={20}
                  dy={20}
                >
                  {`${active.amount} ${active.symbol}`}
                </Text>
              </>
            ) : (
              <>
                <Text textAnchor="middle" fill="#fff" fontSize={40} dy={-20}>
                  {`$${formatNumber(
                    Math.floor(
                      props.coins.reduce(
                        (acc, coin) => acc + coin.amount * coin.inUSD,
                        0
                      )
                    )
                  )}`}
                </Text>

                <Text textAnchor="middle" fill="#ffff" fontSize={20} dy={20}>
                  {`${props.coins.length} Assets`}
                </Text>
              </>
            )}
          </Group>
        </svg>
      </div>
    </>
  );
}
