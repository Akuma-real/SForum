import axios from"axios";import iziToast from"izitoast";if(document.getElementById("vue-user-my-setting")){const e={data(){return{username:"",email:"",old_pwd:"",new_pwd:"",avatar:"",avatar_url:""}},methods:{getFile(e){this.avatar=e.target.files[0]},submit(e){e.preventDefault(),axios.post("/user/myUpdate",{_token:csrf_token,username:this.username,old_pwd:this.old_pwd,new_pwd:this.new_pwd,avatar:this.avatar}).then(e=>{const t=e.data;console.log(t)})}},beforeMount(){axios.post("/user/data",{_token:csrf_token}).then(e=>{this.username=e.data.username,this.email=e.data.email}).catch(e=>{swal({title:"个人信息获取失败,详细查看控制台",icon:"error"}),console.error(e)})}};Vue.createApp(e).mount("#vue-user-my-setting")}$(function(){$('a[user-click="notice_action"]').click(function(){var e=$(this).attr("notice-href"),t=$(this).attr("notice-id");axios.post("/api/user/notice.read",{_token:csrf_token,notice_id:t}).then(t=>{location.href=e})}),$('button[user-click="notice_read"]').click(function(){var e=$(this).attr("notice-id");axios.post("/api/user/notice.read",{_token:csrf_token,notice_id:e}).then(e=>{var t=e.data;t.success===!1?iziToast.error({title:"Error",position:"topRight",message:t.result.msg}):(iziToast.success({title:"Success",position:"topRight",message:t.result.msg}),setTimeout(function(){location.reload()},1500))})})}),$(function(){$('a[user-click="user_follow"]').click(function(){var t=$(this).attr("user-id"),e=$(this);axios.post("/api/user/userfollow",{_token:csrf_token,user_id:t}).then(t=>{var n=t.data;n.success===!0?(n.code===200?e.children("span").text(n.result.msg):e.children("span").text("关注"),iziToast.success({title:"Success",message:n.result.msg,position:"topRight"})):iziToast.error({title:"Error",message:n.result.msg,position:"topRight"})}).catch(e=>{console.error(e),iziToast.error({title:"Error",message:"请求出错,详细查看控制台",position:"topRight"})})}),$('a[user-click="user_follow"]').each(function(){var e=$(this).attr("user-id"),t=$(this);axios.post("/api/user/userfollow.data",{_token:csrf_token,user_id:e}).then(e=>{var n=e.data;n.success===!0&&t.children("span").text(n.result.msg)}).catch(e=>{console.error(e),iziToast.error({title:"Error",message:"请求出错,详细查看控制台",position:"topRight"})})})}),$(function(){$('button[user-click="remove_collections"]').click(function(){var e=$(this).attr("collections-id");axios.post("/api/user/remove.collection",{_token:csrf_token,collection_id:e}).then(e=>{e.data.success?(iziToast.success({title:"Success",message:e.data.result.msg,position:"topRight"}),setTimeout(function(){location.reload()},1500)):iziToast.error({title:"Error",message:e.data.result.msg,position:"topRight"})}).catch(e=>{console.error(e),iziToast.error({title:"Error",message:"请求出错,详细查看控制台",position:"topRight"})})})})