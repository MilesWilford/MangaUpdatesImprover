PlatformVersion=(function(){var f={deploy_ver:"26.06-19"};var e=(function(){return f.deploy_ver.slice(f.deploy_ver.lastIndexOf(".")+1,f.deploy_ver.length);}());var b=(function(){return f.deploy_ver.slice(0,f.deploy_ver.indexOf("."));}());var d=function(){return f;};var a=function(){return e;};var c=function(){return b;};return{getPlatformVersion:d,getMinorPlatformVersion:a,getMajorPlatformVersion:c};}());