import React from 'react';

export const Logo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="94" height="116" viewBox="0 0 94 116">
        <defs>
            <linearGradient id="clock-bulb-a" x1="22.212%" x2="59.586%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#FFDC00"/>
            <stop offset="100%" stopColor="#CD009A"/>
            </linearGradient>
        </defs>
        <path fill="url(#clock-bulb-a)" d="M144,239 C169.957383,239 191,260.042617 191,286 C191,306.302312 178.010128,324.116248 159.081362,330.525828 C158.065489,330.869819 157.038128,331.178712 156.000729,331.452298 L156,343 C156,349.627417 150.627417,355 144,355 C137.372583,355 132,349.627417 132,343 L132.000237,331.452298 C130.617935,331.088156 129.253633,330.660876 127.910777,330.17165 C109.500923,323.464615 97,305.914991 97,286 C97,260.042617 118.042617,239 144,239 Z M144,255 C126.879173,255 113,268.879173 113,286 C113,294.768888 116.674524,302.843185 122.728634,308.558613 C123.642832,309.421668 124.904477,310.37313 126.513571,311.412997 C129.934427,313.623704 132.000391,317.418696 132.000346,321.491715 L132,331 L156,331 L156.000906,321.522378 C156.000978,317.441585 158.074889,313.640519 161.506374,311.431949 C162.905394,310.531512 164.018031,309.705607 164.844283,308.954234 C171.146289,303.223346 175,294.980074 175,286 C175,268.879173 161.120827,255 144,255 Z M144.5,258.5 C146.097681,258.5 147.403661,259.74892 147.494907,261.323727 L147.5,261.5 L147.501074,280.73277 C148.511729,281.259758 149.366535,282.044612 149.978228,283.000071 L163,283 C164.656854,283 166,284.343146 166,286 C166,287.597681 164.75108,288.903661 163.176273,288.994907 L163,289 L150.501596,289.000576 C149.521898,291.349222 147.203729,293 144.5,293 C140.910149,293 138,290.089851 138,286.5 C138,283.992307 139.420075,281.81629 141.499922,280.732251 L141.5,261.5 C141.5,259.843146 142.843146,258.5 144.5,258.5 Z" transform="translate(-97 -239)"/>
    </svg>
  )
}