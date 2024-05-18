$(document).ready( function () {
  $('#myTable').DataTable();
});

const base = 'http://127.0.0.1:3000/'

var app = new Vue({
    el: '#app',
    data: {
      loading : false,
      emptyData:false,
      base:base,
      keySearch : '',
      users : [],
      addDisplay: false,
      minfield : false,
      inputs: 1,
      name: '',
      email: '',
      phone: '',
      addres: '',
      nameMax:50,
      validName : false,
      validPhone : false,
      errP:false,
      validEmail : false,
      errE:false,
      validAddres : false,
      error:false,
      messageError: 'semua field harus diisi'

      // addres: [],
      // addrs:[]
    },
    methods: {
      reset(){
        this.name = ''
        this.phone = ''
        this.email = ''
        this.addres = ''
        this.validName = false
        this.validPhone = false
        this.errP = false
        this.validEmail = false
        this.errE = false
        this.validAddres = false
      },
      getAllData(){
        this.loading= true
        this.users = []
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.get(base+'user')
        .then((result)=>{
          if(result.data.message.length < 1){
            this.loading = false
            this.emptyData = true
          }else{
            result.data.message.map((el,idx)=>{
              this.users.push(el)
              this.loading=false
              this.emptyData = false
            })
          }
        console.log(this.users)
        })
      },
      addUser(){
        console.log('add-user')
        this.reset()
        this.addDisplay= true
      },
      errorStop(){
        this.error = false
      },
      drop(){
        (this.error == true)?this.addDisplay=true
        :this.addDisplay= false
        if(this.error == true){
          this.addDisplay= true
        }else{
          this.addDisplay = false
          this.reset()
        }
      },
      address(){
        this.inputs += 1
        console.log(this.addres)
      },
      deladdress(key){
        this.inputs -= 1
        // this.addres.splice(key)
        // this.addrs.splice(key)
      },
      validation(){
        (this.validName == false)?this.messageError = 'nama tidak boleh kosong'
          :(this.validPhone == false)?this.messageError = 'no handphone tidak boleh kosong'
          :(this.validEmail == false)?this.messageError = 'email tidak boleh kosong'
          :(this.validAddres == false)?this.messageError = 'alamat tidak boleh kosong'
          : console.log('oke')
      },
      save(){
        
        console.log('save')
       if(this.validPhone == true && this.validEmail == true && this.validName ==  true && this.validAddres == true){
        this.loading = true
          data = {
            name:this.name,
            phone:this.phone,
            email:this.email,
            address:this.addres
          }
          axios.post(base+'user',data)
          .then((result)=>{
            console.log('save result',result)
            this.getAllData()
            this.loading = false
            this.emptyData = false
            location.reload();
          })
       }else{
        this.validation()
        this.error = true
       }
      },
      search(){
       if(this.keySearch.length < 3){

       }else{
        this.loading = true
        this.users = []
        data = {
          key:this.keySearch
        }
        axios.post(base+'user/search',data)
        .then((result)=>{
          console.log(result)
          this.loading = false
          result.data.message.map((el,idx)=>{
            this.users.push(el)
          })
        })
       }
      }
    },
    watch:{
      inputs: function (val) {
        (val > 1)?this.minfield = true : this.minfield = false
      },
      name: function(val){
        if(val.length < 1){
          this.validName = false
        }else{
          this.validName = true
        }
      },
      phone: function(val){
        if(val.length > 10 && isNaN(val) == false){
          this.validPhone = true
          this.errP = false
        }else{
          this.errP = true
          this.validPhone = false
        }
      },
      email: function(val){
        var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if(val.length > 1 && re.test(val)== true){
          this.errE = false
        }else{
          this.validEmail = true
          this.errE = true
        }

        // (val.length > 5)?this.validEmail = true : this.validEmail = false
      },
      addres: function(val){
        (val.length > 5)?this.validAddres = true : this.validAddres = false
      
      // console.log(re.test(val))
      //   // let notif = []
      //   // for(var i = 1; i < val.length; i++){
      //   //   // (val[i].length === 0)?notif[i] = :console.log('berhasil')
      //   //   this.addrs[i]=val[i]
      //   // }
      },
    },
    mounted() {
      this.getAllData()
    },

  })