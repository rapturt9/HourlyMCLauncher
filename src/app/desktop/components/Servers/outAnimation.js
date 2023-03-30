let t = 2;
console.log(`
<?xml version="1.0" encoding="utf-8"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="50 75 240 200" xml:space="preserve">
<style type="text/css">
	.st0{fill:#e08119;}
</style>
<polygon id="glass" class="st0" points="154,186 154,202 132,224 101,224 101,128 132,128 172,168 212,128 243,128 243,224 212,224 190,202 190,186 212,208 228,208 228,144 212,144 172,184 132,144 116,144 116,208 132,208 "/>
<polygon id="top" class="st0" opacity="0" points="132,150 158,176 132,202 122,202 122, 150"/>
<polygon id="bottom" class="st0" opacity="0" points="212,150 186,176 212,202 222,202 222, 150"/>
<polygon id="fall" class="st0" opacity="0" points="186,176 186,176 186,176 186,176 186,176"/>
   <animateTransform 
    xlink:href="#glass"
            attributeName="transform" 
      attributeType="XML"
    type="rotate"
    dur=${t*0.5}s
    values="0 172 176;90 172 176;"
    keyTimes="0;1"
                     calcMode="spline"
           keySplines="0.7 0 1 1"
           fill="freeze"
           id="rot1"/>
  <animateTransform 
    xlink:href="#top"
            attributeName="transform" 
      attributeType="XML"
    type="rotate"
    dur="${t*0.5}s"
    values="0 172 176;90 172 176;"
    keyTimes="0;1"
                     calcMode="spline"
           keySplines="0.7 0 1 1"
           begin="rot1.begin"
           fill="freeze"/>
  <animateTransform 
    xlink:href="#bottom"
            attributeName="transform" 
      attributeType="XML"
    type="rotate"
    dur="${t*0.5}s"
    values="0 172 176;90 172 176;"
    keyTimes="0;1"
                     calcMode="spline"
           keySplines="0.7 0 1 1"
           begin="rot1.begin"
           fill="freeze"/>
  <animateTransform 
    xlink:href="#fall"
            attributeName="transform" 
      attributeType="XML"
    type="rotate"
    dur="${t*0.5}s"
    values="0 172 176;90 172 176;"
    keyTimes="0;1"
                     calcMode="spline"
                     begin="rot1.begin"
           keySplines="0.7 0 1 1"
           fill="freeze"/>
 <animate 
    xlink:href="#top"
    attributeName="opacity"
    from="0"
    to="1" 
    dur="${t*0.3}s"
           begin="rot1.end"
           fill="freeze"
           id="op"/>
  <animate 
    xlink:href="#top"
    attributeName="points"
    values="132,150 158,176 132,202 122,202 122, 150; 132,150 158,176 132,202 132,202 132,150; 158,176 158,176 158,176 158,176 158,176"
           calcMode="spline"
           keySplines="0 0 1 1; 0.7 0 1 1"
    dur="${t*1}s"
           keyTimes="0;0.5;1"
           begin="op.end;last.end"
           fill="freeze"
           id="m1"/>
  <animate 
    xlink:href="#fall"
    attributeName="opacity"
    from="0"
    to="1" 
    dur="${t*0.1}s"
           begin="op.end;last.end"
           fill="freeze"/>
  <animate 
    xlink:href="#fall"
    attributeName="points"
    values="186,176 186,176 186,176 186,176 186,176; 192,170 186,176 192,182 192,182 192,170; 192,170 186,176 192,182 222,182 222,170"
           calcMode="spline"
           keySplines="0 0 1 1; 0.1 0 1 1"
    dur="${t*0.2}s"
           keyTimes="0;0.1;1"
           begin="op.end;last.end"
           fill="freeze"
           id="m3"/>
  <animate 
    xlink:href="#bottom"
    attributeName="opacity"
    from="0"
    to="1" 
    dur="${t*0.1}s"
           begin="m3.end"
           fill="freeze"/>
  <animate 
    xlink:href="#bottom"
    attributeName="points"
    values="222,150 222,176 222,202 222,202 222, 150; 216,150 212,176 216,202 222,202 222, 150; 212,150 186,176 212,202 222,202 222, 150"
           calcMode="spline"
           keySplines="0 0 1 1; 0.1 0 1 1"
    dur="${t*0.8}s"
           keyTimes="0;0.5;1"
           begin="m3.end"
           fill="freeze"
           id="m2"/>
  <animateTransform 
    xlink:href="#glass"
            attributeName="transform" 
      attributeType="XML"
    type="rotate"
    dur="${t*0.5}s"
    values="90 172 176;270 172 176;"
    keyTimes="0;1"
                     calcMode="spline"
           keySplines="0.7 0 1 1"
            
           fill="freeze"
            begin="m2.end"
           id="rot2"/>
  <animateTransform 
    xlink:href="#top"
            attributeName="transform" 
      attributeType="XML"
    type="rotate"
    dur="${t*0.5}s"
    values="90 172 176;270 172 176;"
    keyTimes="0;1"
                     calcMode="spline"
           keySplines="0.7 0 1 1"
            
           fill="freeze"
            begin="m2.end"/>
  <animateTransform 
    xlink:href="#bottom"
            attributeName="transform" 
      attributeType="XML"
    type="rotate"
    dur="${t*0.5}s"
    values="90 172 176;270 172 176;"
    keyTimes="0;1"
                     calcMode="spline"
           keySplines="0.7 0 1 1"
            
           fill="freeze"
            begin="m2.end"/>
  <animate 
    xlink:href="#fall"
    attributeName="opacity"
    from="1"
    to="0" 
    dur="0.01s"
           begin="m2.end"
           fill="freeze"/>
  <animate 
    xlink:href="#fall"
    attributeName="points"
    to="186,176 186,176 186,176 186,176 186,176"
    dur="0.01s"
           begin="m2.end"
           fill="freeze"/>
  <animate 
    xlink:href="#bottom"
    attributeName="points"
    values="212,150 186,176 212,202 222,202 222,150; 212,150 186,176 212,202 212,202 212,150; 186,176 186,176 186,176 186,176 186,176"
           calcMode="spline"
           keySplines="0 0 1 1; 0.7 0 1 1"
    dur="${t*1}s"
           keyTimes="0;0.5;1"
           begin="rot2.end"
           fill="freeze"
           id="n1"/>
  <animate 
    xlink:href="#fall"
    attributeName="opacity"
    from="0"
    to="1" 
    dur="0.1s"
           begin="rot2.end"
           fill="freeze"/>
  <animate 
    xlink:href="#fall"
    attributeName="points"
    values="186,176 186,176 186,176 186,176 186,176; 192,170 186,176 192,182 192,182 192,170; 192,170 186,176 192,182 222,182 222,170"
           calcMode="spline"
           keySplines="0 0 1 1; 0.1 0 1 1"
    dur="${t*0.2}s"
           keyTimes="0;0.1;1"
           begin="rot2.end"
           fill="freeze"
           id="n3"/>
  <animate 
    xlink:href="#top"
    attributeName="opacity"
    from="0"
    to="1" 
    dur="0.1s"
           begin="n3.end"
           fill="freeze"/>
  <animate 
    xlink:href="#top"
    attributeName="points"
    values="122,150 122,176 122,202 122,202 122,150;128,150 132,176 128,202 122,202 122,150; 132,150 158,176 132,202 122,202 122,150"
           calcMode="spline"
           keySplines="0 0 1 1; 0.1 0 1 1"
    dur="${t*0.8}s"
           keyTimes="0;0.5;1"
           begin="n3.end"
           fill="freeze"
           id="n2"/>
  <animateTransform 
    xlink:href="#glass"
            attributeName="transform" 
      attributeType="XML"
    type="rotate"
    dur="${t*0.5}s"
    values="270 172 176;450 172 176;"
    keyTimes="0;1"
                     calcMode="spline"
           keySplines="0.7 0 1 1"
            id="last"
           fill="freeze"
            begin="n2.end"/>
  <animateTransform 
    xlink:href="#top"
            attributeName="transform" 
      attributeType="XML"
    type="rotate"
    dur="${t*0.5}s"
    values="270 172 176;450 172 176;"
    keyTimes="0;1"
                     calcMode="spline"
           keySplines="0.7 0 1 1"
            
           fill="freeze"
            begin="n2.end"/>
  <animateTransform 
    xlink:href="#bottom"
            attributeName="transform" 
      attributeType="XML"
    type="rotate"
    dur="${t*0.5}s"
    values="270 172 176;450 172 176;"
    keyTimes="0;1"
                     calcMode="spline"
           keySplines="0.7 0 1 1"
            
           fill="freeze"
            begin="n2.end"/>
  <animate 
    xlink:href="#fall"
    attributeName="opacity"
    from="1"
    to="0" 
    dur="0.01s"
           begin="n2.end"
           fill="freeze"/>
  <animate 
    xlink:href="#fall"
    attributeName="points"
    to="186,176 186,176 186,176 186,176 186,176"
    dur="0.01s"
           begin="n2.end"
           fill="freeze"/>
</svg>
`)