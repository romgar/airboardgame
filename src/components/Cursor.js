import React from 'react';

export const Cursor = ({ color = '#666', size = 40, pos, text }) => (
  <div
    style={{
      position: 'fixed',
      top: pos.y - size / 2,
      left: pos.x - size / 2,
      //transition: 'left 100ms, top 100ms',
      opacity: '0.7',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    }}
  >
    <svg viewBox={`0 0 1024 1024`} width={size} height={size}>
      <g>
        <g
          fill={color}
          transform='translate(0.000000,511.000000) scale(0.100000,-0.100000)'
        >
          <path d='M4637.4,4295.2v-712.7l-66.3-10.4c-294.2-47.7-464.1-87-652.6-149.2c-1060.8-346-1885.4-1170.6-2231.4-2231.4c-62.2-188.5-101.5-358.4-149.2-650.6l-10.4-68.4H814.8H100V110v-362.6h714.8h712.7l10.4-66.3c72.5-449.6,159.5-743.8,308.7-1060.8c348.1-731.4,932.3-1315.6,1663.7-1663.7c317-149.2,611.2-236.2,1060.8-308.7l66.3-10.4v-712.7V-4790H5000h362.6v714.8v712.7l68.4,10.4c439.2,72.5,733.4,155.4,1042.2,300.4c735.5,346,1342.6,953.1,1688.6,1688.6c145,308.7,227.9,602.9,300.4,1044.2l10.4,66.3h712.7H9900V110v362.6h-714.8h-712.7l-10.4,68.4c-72.5,447.5-159.5,741.7-308.7,1058.7c-348.1,731.4-932.4,1315.6-1663.7,1663.7c-317,149.2-611.2,236.2-1058.7,308.7l-68.4,10.4v712.7V5010H5000h-362.6V4295.2z M4637.4,2026.5v-953.1H5000h362.6v953.1c0,646.4,6.2,953.1,20.7,953.1c12.4,0,93.2-14.5,182.3-33.1c1087.7-223.8,1953.8-1042.2,2229.4-2105c29-105.7,58-232,64.2-279.7l14.5-89.1h-955.1h-955.1V110v-362.6h955.1h955.1l-14.5-87c-72.5-470.3-304.6-986.2-619.5-1375.7c-430.9-536.6-1110.5-928.2-1788-1033.9l-89.1-14.5v955.1v955.1H5000h-362.6v-955.1v-955.1l-87,14.5c-49.7,6.2-176.1,35.2-281.8,64.2c-1062.9,275.6-1881.3,1141.6-2105,2229.4c-18.6,89.1-33.2,169.9-33.2,182.3c0,14.5,306.6,20.7,953.1,20.7h953.1V110v362.6h-955.1h-955.1l14.5,89.1c6.2,47.7,35.2,174,64.2,279.7c246.6,955.1,988.3,1734.2,1920.6,2024.2c172,53.9,408.2,109.8,476.5,111.9C4635.3,2979.6,4637.4,2921.5,4637.4,2026.5z' />
        </g>
      </g>
    </svg>
    <div
      style={{
        color,
        maxWidth: '5em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginLeft: '0.5em',
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  </div>
);

export default Cursor;

/*

<g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M4637.4,4295.2v-712.7l-66.3-10.4c-294.2-47.7-464.1-87-652.6-149.2c-1060.8-346-1885.4-1170.6-2231.4-2231.4c-62.2-188.5-101.5-358.4-149.2-650.6l-10.4-68.4H814.8H100V110v-362.6h714.8h712.7l10.4-66.3c72.5-449.6,159.5-743.8,308.7-1060.8c348.1-731.4,932.3-1315.6,1663.7-1663.7c317-149.2,611.2-236.2,1060.8-308.7l66.3-10.4v-712.7V-4790H5000h362.6v714.8v712.7l68.4,10.4c439.2,72.5,733.4,155.4,1042.2,300.4c735.5,346,1342.6,953.1,1688.6,1688.6c145,308.7,227.9,602.9,300.4,1044.2l10.4,66.3h712.7H9900V110v362.6h-714.8h-712.7l-10.4,68.4c-72.5,447.5-159.5,741.7-308.7,1058.7c-348.1,731.4-932.4,1315.6-1663.7,1663.7c-317,149.2-611.2,236.2-1058.7,308.7l-68.4,10.4v712.7V5010H5000h-362.6V4295.2z M4637.4,2026.5v-953.1H5000h362.6v953.1c0,646.4,6.2,953.1,20.7,953.1c12.4,0,93.2-14.5,182.3-33.1c1087.7-223.8,1953.8-1042.2,2229.4-2105c29-105.7,58-232,64.2-279.7l14.5-89.1h-955.1h-955.1V110v-362.6h955.1h955.1l-14.5-87c-72.5-470.3-304.6-986.2-619.5-1375.7c-430.9-536.6-1110.5-928.2-1788-1033.9l-89.1-14.5v955.1v955.1H5000h-362.6v-955.1v-955.1l-87,14.5c-49.7,6.2-176.1,35.2-281.8,64.2c-1062.9,275.6-1881.3,1141.6-2105,2229.4c-18.6,89.1-33.2,169.9-33.2,182.3c0,14.5,306.6,20.7,953.1,20.7h953.1V110v362.6h-955.1h-955.1l14.5,89.1c6.2,47.7,35.2,174,64.2,279.7c246.6,955.1,988.3,1734.2,1920.6,2024.2c172,53.9,408.2,109.8,476.5,111.9C4635.3,2979.6,4637.4,2921.5,4637.4,2026.5z"/></g></g>

    <svg viewBox={`0 0 512 512`} width={size} height={size}>
      <path
        fill={color}
        d='M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4
    L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1
    c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1
    c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z'
      />
    </svg>


    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size}>
      <circle fill={color} cx={size / 2} cy={size / 2} r={size / 2} />
    </svg>
*/
