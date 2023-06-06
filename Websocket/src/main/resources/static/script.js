var stompClient=null


function connect(){

    let socket= new SockJS("/server1")

    stompClient=Stomp.over(socket)

    stompClient.connect({},function(frame){

            console.log("connected :"+frame)

            $("#name-form").addClass("d-none")
            $("#chat-room").removeClass("d-none")


            stompClient.subscribe("/topic/return-to",function(response){

            console.log("Response body above showmsg call  ::   "+response.body);

                showMessage(JSON.parse(response.body));

            })

    })

}

function showMessage(message){

        console.log("Inside show msg :: "+message.name+" : "+message.content)

        $("#message-container-table").prepend(`<tr><td><b>${message.name}</b> : <span>${message.content}</span> <i style="margin-left: 2% ; font-size: 0.8em; font-weight: lighter">(${message.msg_time})</i></td></tr>`)

}

    function sendMessage(){

            let jsonOb={

                    name:localStorage.getItem("name"),
                    content:$("#message-value").val()
            }

            console.log("JsonOb of sendMessage :: "+jsonOb);

            stompClient.send("/app/message",{},JSON.stringify(jsonOb))

    }

$(document).ready((e)=>{

        $("#login").click(()=>{


            let name= $("#name-value").val()
            localStorage.setItem("name",name)

            $("#user-name").html(`Welcome, <b>${name}</b>`)

            connect();

        })

        $("#send").click(()=>{

            sendMessage();
            $("#message-value").val('');

        })

        $("#logout").click(()=>{

                   localStorage.removeItem("name")
                   if(stompClient!==null)
                   {
                           stompClient.disconnect()
                           $("#name-form").removeClass("d-none")
                           $("#chat-room").addClass("d-none")

                           location.reload(true);

                   }

        })



})