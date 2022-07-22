let map=[];
let level=2;
for(var i=0;i<4;i+=1){
    map[i]=[];
    for(var j=0;j<5;j+=1){
        map[i][j]=0;
    }
}
document.getElementById("check_box").innerHTML=
`
<div class="door"></div>
<div class="piece piece_1_1" id="p11_1"></div>
<div class="piece piece_1_1" id="p11_2"></div>
<div class="piece piece_1_1" id="p11_3"></div>
<div class="piece piece_1_1" id="p11_4"></div>
<div class="piece piece_1_2" id="p12_1"></div>
<div class="piece piece_1_2" id="p12_2"></div>
<div class="piece piece_1_2" id="p12_3"></div>
<div class="piece piece_1_2" id="p12_4"></div>
<div class="piece piece_2_1" id="p21_1"></div>
<div class="piece piece_2_2" id="p22_1">
    <img class="key_img" src="picture/key.png">
    <div class="wrapper"></div>
</div>
<div class="control_box">
    <div class="restart" onclick="restart()">
        <img class="control_img" src="picture/restart.png">
        <div class="wrapper"></div>
    </div>
    <div class="level" id="level_1" onclick="setlevel(1)">
        <img class="control_img" src="picture/hard.png">
        <div class="wrapper"></div>
    </div>
    <div class="level chosen" id="level_2" onclick="setlevel(2)">
        <img class="control_img" src="picture/common.png">
        <div class="wrapper"></div>
    </div>
    <div class="level" id="level_3" onclick="setlevel(3)">
        <img class="control_img" src="picture/easy.png">
        <div class="wrapper"></div>
    </div>
</div>`
let pieces=document.getElementsByClassName("piece");
restart();
for( let piece of pieces){
    piece.onmousedown=function(event){
        var x=piece.offsetLeft/75,y=piece.offsetTop/75;
        var px=piece.offsetWidth/75,py=piece.offsetHeight/75;
        var mx=event.clientX,my=event.clientY;
        document.onmouseup=function(){
            this.onmousemove=null;
            this.onmouseup=null;
        }
        document.onmousemove=function(event){
            if((event.clientX-mx)>50){
                if( x+px<4 ){
                    if(ifempty(x+px,y,1,py)){
                        for(var i=0;i<py;i+=1){
                            map[x][y+i]=0;
                            map[x+px][y+i]=1;
                        }
                        piece.style.left=(x+1)*75+"px";
                        x+=1;
                        mx=event.clientX;
                    }
                }
            }
            else{
                if((event.clientX-mx) < -50){
                    if( x>0){
                        if(ifempty(x-1,y,1,py)){
                            for(var i=0;i<py;i+=1){
                                map[x+px-1][y+i]=0;
                                map[x-1][y+i]=1;
                            }
                            piece.style.left=(x-1)*75+"px";
                            x-=1;
                            mx=event.clientX;
                        }
                    }
                }
            }
            if((event.clientY-my)>50){
                if( y+py<5){
                    if(ifempty(x,y+py,px,1)){
                        for(var i=0;i<px;i+=1){
                            map[x+i][y]=0;
                            map[x+i][y+py]=1;
                        }
                        piece.style.top=(y+1)*75+"px";
                        y+=1;
                        my=event.clientY;
                    }
                }
            }
            else{
                if((event.clientY-my) < -50){
                    if( y>0){
                        if(ifempty(x,y-1,px,1)){
                            for(var i=0;i<px;i+=1){
                                map[x+i][y+py-1]=0;
                                map[x+i][y-1]=1;
                            }
                            piece.style.top=(y-1)*75+"px";
                            y-=1;
                            my=event.clientY;
                        }
                    }
                }
            }

            document.onmouseup=function(){
                if(piece.className=="piece piece_2_2"){
                    if(x==1 && y==3){
                        next();
                    }
                }
                this.onmousemove=null;
                this.onmouseup=null;
            }
        }
    }
}

function restart(){    
    for( let piece of pieces){
        piece.style.display="none";
    }
    for(var i=0;i<4;i+=1){
        map[i]=[];
        for(var j=0;j<5;j+=1){
            map[i][j]=0;
        }
    }
    var sum_11=4,sum_12=4;
    switch(level){
        case 3:
            sum_12=2;
        case 2:
            sum_11=2;
        default:
            break;
    }
    newpiece(2,2,1);
    newpiece(2,1,1);
    newpiece(1,2,sum_12);
    newpiece(1,1,sum_11);
    document.getElementsByClassName("control_box")[0].style.display="none";
    setTimeout(function(){document.getElementsByClassName("control_box")[0].style.display="block";},1000);
}
function newpiece(px,py,psum){
    for(var i=1;i<=psum;i+=1){
        var maxx=5-px,maxy=6-py;
        var mapx=Math.floor(Math.random()*maxx);
        var mapy=Math.floor(Math.random()*maxy);
        var j=0;
        while(!ifempty(mapx,mapy,px,py) && j<100 || px==2 && py==2 && mapx==1 && mapy==3){
            mapx=Math.floor(Math.random()*maxx);
            mapy=Math.floor(Math.random()*maxy);
            j+=1;
        }
        for(var ix=0;ix<px;ix+=1){
            for(var iy=0;iy<py;iy+=1){
                map[mapx+ix][mapy+iy]=1;
            }
        }
        document.getElementById("p"+px+py+"_"+i).style.display="block";
        document.getElementById("p"+px+py+"_"+i).style.left=mapx*75+"px";
        document.getElementById("p"+px+py+"_"+i).style.top=mapy*75+"px";
    }
}
function ifempty(x,y,px,py){
    for(var ix=0;ix<px;ix+=1){
        for(var iy=0;iy<py;iy+=1){
            if(map[x+ix][y+iy]==1){
                return false;
            }
        }
    }
    return true;
}
function setlevel(i){
    document.getElementById("level_"+level).className="level";
    document.getElementById("level_"+i).className="level chosen";
    level=i;
    restart();
}
function next(){
    alert("success");
}