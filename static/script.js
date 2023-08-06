const socket = io();

document.querySelector('.btn').addEventListener('click',() => {
    globalThis.uservalue = document.querySelector('.Username').value
    if (uservalue.length > 1){
        socket.emit('User-joined',uservalue);

        document.querySelector('.Parent').style.marginTop = '-20%';
        document.querySelector('.pointer').style.marginTop = '2%';
        document.querySelector('.Parent').style.display = 'none';
        document.querySelector('.pointer').style.transition = '0.7s ease'
        document.querySelector('.Parent').innerHTML = null;
    }else{
        location.reload();
    }
})

const sendmsg = document.querySelector('.send').addEventListener('click',(e) => {
    let msgvalue = document.querySelector('.messagewrt').value
    e.preventDefault()
    if (msgvalue == ''){
        console.log('invalid key')
    }else{
        socket.emit('msgrecv',{ username:uservalue,msg:msgvalue })
        document.querySelector('.messagewrt').value = ''
    }
})

document.querySelector('.messagewrt').addEventListener('keyup',(e) => {
    if (e.key === 'Enter'){
        let msgvalue = document.querySelector('.messagewrt').value
        e.preventDefault()
        if (msgvalue == ''){
            console.log('invalid key')
        }else{
            socket.emit('msgrecv',{ username:uservalue,msg:msgvalue })
            document.querySelector('.messagewrt').value = ''
        }
    }
})

socket.on('displayIn',data => {
    const ParentContainer = document.querySelector('.mainbox')
    let item = document.createElement('div')
    item.className = 'incmsg'
    item.innerHTML = `<div class="User-info">
    <img src="media/user-icon.png" class="user-ico"><label>${data.user}</label></div><p>${data.message}</p>`
    ParentContainer.appendChild(item)
    ParentContainer.scrollTop = ParentContainer.scrollHeight;
})

socket.on('displayOut',data => {
    const ParentContainer = document.querySelector('.mainbox')
    let item = document.createElement('div')
    item.className = 'outmsg'
    item.innerHTML = `<div class="User-info">
    <img src="media/user-icon.png" class="user-ico"><label>${data.user}</label></div><p>${data.message}</p>`
    ParentContainer.appendChild(item)
    ParentContainer.scrollTop = ParentContainer.scrollHeight;
})