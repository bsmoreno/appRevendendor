const o=(r,e)=>{let t,i,n=0;e===1?(t=10,i=9):(t=11,i=10);for(let s=0;s<i;s+=1)n+=r[s]*t,t-=1;const a=Math.floor(n%11);let f=0;return a>1&&(f=11-a),r[i]===f},c=r=>{if(typeof r!="string"&&typeof r!="number")return!1;let e=String(r);if(e=e.replace(/\.|-/g,""),e.length!==11)return!1;const t=Array.from(e,Number);if(t.every((f,s,l)=>f===l[0]))return!1;const n=o(t,1),a=o(t,2);return!(!n||!a)},u=(r,e)=>{let t,i,n=0;e===1?(t=[5,4,3,2,9,8,7,6,5,4,3,2],i=12):(t=[6,5,4,3,2,9,8,7,6,5,4,3,2],i=13);for(let s=0;s<i;s+=1){const l=t[s]*r[s];n+=l}const a=Math.floor(n%11);let f=0;return a>=2&&(f=11-a),r[i]===f},g=r=>{if(typeof r!="string"&&typeof r!="number")return!1;let e=String(r);if(e=e.replace(/\.|-|\//g,""),e.length!==14)return!1;const t=Array.from(e,Number);if(t.every((f,s,l)=>f===l[0]))return!1;const n=u(t,1),a=u(t,2);return!(!n||!a)};class d{static isCPF(e){return c(e)}static isCNPJ(e){return g(e)}}export{d as V};
