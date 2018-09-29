import * as React from 'react';
import MapCircle, { BoothCircle } from './MapCircle';

const circles: BoothCircle[] = [
  { no: 12, x: 57, y: 66 },
  { no: 11, x: 159, y: 119 },
  { no: 10, x: 114, y: 167 }
];

interface Props {
  currentNo: number | null;
  onHoverItem: (no: number) => void;
  onBlurItem: () => void;
}

const StudioMap: React.SFC<Props> = ({
  currentNo,
  onHoverItem,
  onBlurItem,
  ...props
}) => (
  <svg
    viewBox="0 0 271 274"
    width="271px"
    height="274px"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
      <g transform="translate(-791.000000, -6978.000000)">
        <g transform="translate(260.000000, 6230.000000)">
          <g transform="translate(532.000000, 748.000000)">
            <g>
              <path
                d="M0.5,107 L97.6986944,12.3656307 L97.6986944,2 M138.330909,2 L138.330909,12.3656307 L258.221308,12.3656307 C258.221308,12.3656307 271.224158,126.365718 190.961279,206.387181 C110.701545,286.411781 0.847272727,270.763111 0.847272727,270.763111 L1,106"
                stroke="#121C3B"
                strokeWidth={2}
              />
              <path
                d="M122.137702,7.0469706 L112.545455,7.0469706 C112.244208,7.0469706 112,6.80208352 112,6.5 C112,6.19791648 112.244208,5.9530294 112.545455,5.9530294 L122.137702,5.9530294 L118.12955,1.93373721 C117.916537,1.72013191 117.916537,1.37380928 118.12955,1.16020398 C118.342563,0.946598674 118.687926,0.946598674 118.900939,1.16020398 L123.84024,6.11323338 C123.938948,6.21221559 124,6.34895824 124,6.5 C124,6.65104176 123.938948,6.78778441 123.84024,6.88676662 L118.900939,11.839796 C118.687926,12.0534013 118.342563,12.0534013 118.12955,11.839796 C117.916537,11.6261907 117.916537,11.2798681 118.12955,11.0662628 L122.137702,7.0469706 Z"
                fill="#121C3B"
                fillRule="nonzero"
                transform="translate(118.000000, 6.500000) rotate(90.000000) translate(-118.000000, -6.500000) "
              />
            </g>
            <g
              transform="translate(52.000000, 216.000000)"
              stroke="#121C3B"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            >
              <path d="M7.77777778,15.1111111 L7.77777778,16.9292929 L4.94949495,16.9292929 L4.94949495,15.1111111 M6.36363636,17.2868687 L6.36363636,20" />
              <path
                d="M11.3131313,5.49494949 L11.3131313,11.6767677 C11.3131313,12.5876122 10.9406576,13.4611509 10.2776502,14.1052152 C9.61464284,14.7492795 8.71541183,15.1111111 7.77777778,15.1111111 L4.94949495,15.1111111 C2.99697311,15.1111111 1.41414141,13.5735032 1.41414141,11.6767677 L1.41414141,5.49494949 M3.55271368e-15,5.49494949 L12.7272727,5.49494949 M3.53535354,5.49494949 L3.53535354,0 M9.19191919,5.49494949 L9.19191919,0"
                fill="#E7E8EB"
              />
            </g>
            {circles.map(circle => {
              const active = circle.no === currentNo;
              return (
                <MapCircle
                  key={circle.no}
                  circle={circle}
                  active={active}
                  onHoverItem={onHoverItem}
                  onBlurItem={onBlurItem}
                />
              );
            })}
            <text
              fontFamily="Montserrat-Regular, Montserrat"
              fontSize={16}
              fontWeight="normal"
              letterSpacing={-0.3858825}
              fill="#121C3B"
            >
              <tspan x={208} y={216}>
                window
              </tspan>
            </text>
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default StudioMap;
