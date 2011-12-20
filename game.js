
        var socket = io.connect('http://107.21.108.104:4000');
        var graphics = new Graphics();        
        var person = new Person(150,50, 10, new Color(238,233,233,1), 10,graphics );
        var person2 = new Person(550,350, 10, new Color(238,233,233,1), 10,graphics );
        var sickPerson = new Person(250,250, 10, new Color(215,0,0,1),40, graphics);
        var doctor = new Person(150,450, 10, new Color(0,255,0,1), -40, graphics);
        var level;

         socket.on('smove', function(data) {
            
           // console.log(data.person);
            person.position = data.person.position;
         });
        
        		           
        var x = 100;
        var y = 100;
        var canvas;
        var context;
		var movementAmount = 10;
      
    function init(){
               
            canvas = document.getElementById("canvas");
            context = canvas.getContext("2d"); 
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
       
            person.heal();
            level = new level();
                
            document.onkeypress = doSomething;
			setInterval("mainLoop()",30);
			setInterval("graphics.incermentTime()",30);
				
	
            if (window.addEventListener)
            /** DOMMouseScroll is for mozilla. */
            window.addEventListener('DOMMouseScroll', wheel, false);
            /** IE/Opera. */
            window.onmousewheel = document.onmousewheel = wheel;            
    }
            
                       
    function mainLoop(){
												
				person.checkCollision(sickPerson);
				person.checkCollision(doctor);
				person2.checkCollision(person);
                
                   
				context.save();
				context.scale(10,10);
                context.fillStyle = "#E9EDE8";
                context.fillRect(0, 0, 2000, 2000);
                context.restore();
                 
								
				context.save();
				context.fillStyle = "rgba("+88+","+88+","+88+","+ 0.5+")";
				context.font  = '30px helvetica';
				context.fillText("A+E", 300,150);
				context.restore();				

				               
                context.strokeStyle = "#EEEEEE";
                context.fillStyle = "#F3F1E5";
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
                context.shadowBlur = 15;
                context.shadowColor = "#BBBBBB";
                
               
				person.draw();
				sickPerson.draw();
				doctor.draw();
				person2.draw();

                 level.drawLevel(context);
     				            
    }
         
            
    function doSomething(){
                if (!e) 
                    var e = window.event;
					
                if (e.keyCode) 
                    code = e.keyCode;
                
                
                if (code == 119) {
                    person.position.y -= movementAmount;
                }
                
                if (code == 115) {
                    person.position.y += movementAmount;
                }
                
                
                if (code == 100) {
                    person.position.x += movementAmount;
                }
                
                
                if (code == 97) {
                    person.position.x -= movementAmount;
                }
                
                 if (code == 13) {
              
                }
                
                 socket.emit('smove', {person:person});  
    }