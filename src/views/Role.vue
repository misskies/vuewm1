<template>
  <div>

    <div style="margin: 10px 0" >

      <el-input style="width:200px" placeholder="请输入名称" suffix-icon="el-icon-search" v-model="name"></el-input>
      <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
      <el-button class="ml-5" type="warning" @click="reset">重置</el-button>
    </div>

    <div style="margin: 10px 0">
      <el-button type="primary" @click="handleAdd">新增<i class="el-icon-circle-plus"></i></el-button>
      <el-popconfirm
          class="ml-5"
          confirm-button-text="确定"
          cancel-button-text="我再想想"
          icon="el-icon-info"
          icon-color="red"
          title="确定批量删除吗？"
          @confirm="delBatch"
      >
        <el-button type="danger" class="mr-5" slot="reference">批量删除<i class="el-icon-remove-outline"></i></el-button>
      </el-popconfirm>
    </div>

    <el-table :data="tableData" border stripe header-cell-class-name="headerBg" @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column prop="id" label="ID" width="80">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="140">
      </el-table-column>
      <el-table-column prop="description" label="描述" width="120">
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">

          <el-button type="info" @click="selectMenu(scope.row)">分配菜单<i class="el-icon-menu"></i></el-button>
          <el-button type="success" @click="handleEdit(scope.row)">编辑<i class="el-icon-edit"></i></el-button>
          <el-popconfirm
              class="ml-5"
              confirm-button-text="确定"
              cancel-button-text="我再想想"
              icon="el-icon-info"
              icon-color="red"
              title="这是一段内容确定删除吗？"
              @confirm="del(scope.row.id)"
          >
            <el-button type="danger" slot="reference">删除<i class="el-icon-remove"></i></el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>


    <div style="padding: 10px 0">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[5, 10, 20, 50]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>

    <el-dialog title="角色信息" :visible.sync="dialogFormVisible" width="30%" size="small">

      <el-form label-width="80px">
        <el-form-item label="名称" >
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="唯一标识" >
          <el-input v-model="form.flag" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input v-model="form.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>


    <el-dialog title="菜单分配" :visible.sync="menuDialogVis" width="30%">
      <el-tree
          :props="props"
          :data="menuData"
          ref="tree"
          show-checkbox
          node-key="id"
          :default-checked-keys="expends"
          :default-expanded-keys="checks"
          >
          <span class="custom-tree-node" slot-scope="{node,data}">
            <span><i :class="data.icon"></i> {{data.name}}</span>
          </span>

      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="menuDialogVis = false">取 消</el-button>
        <el-button type="primary" @click="saveRoleMenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "User",
  data(){
    return{
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:10,
      name:"",
      dialogFormVisible:false,
      form:{},
      multipleSelection:[],
      menuDialogVis: false,
      menuData: [],
      props:{
        label:'name',
      },

      expends:[],
      checks:[],
      roleId:0,
      roleFlag:''
    }
  },
  created() {
    this.load()
  },
  methods:{
    load(){
      this.request.get("/role/page",{
        params:{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          name:this.name,
        }
      }).then(res=>{
        console.log(res.data)
        this.tableData=res.data.records
        this.total=res.data.total
      })
    },
    reset(){
      this.name=""
      this.load()
    },
    handleSizeChange(pageSize){
      this.pageSize=pageSize
      this.load()
    },
    handleAdd(){
      this.dialogFormVisible=true
      this.form={}
    },
    handleEdit(row){
      this.form=row
      this.dialogFormVisible=true
    },
    del(id){
      this.request.delete("/role/"+id).then(res => {
        if(res.code==='200') {
          this.$message.success("删除成功")
          this.dialogFormVisible=false
          this.load()
        }
        else {
          this.$message.success("删除失败")
        }
      })
    },
    handleSelectionChange(val){
      console.log(val)
      this.multipleSelection=val
    },
    delBatch(){
      let ids=this.multipleSelection.map(v => v.id)
      console.log(ids)
      this.request.post("/role/del/batch",ids).then(res => {
        if(res.code==='200') {
          this.$message.success("批量删除成功")
          this.dialogFormVisible=false
          this.load()
        }
        else {
          this.$message.success("批量删除失败")
        }
      })
    },
    save(){
      this.request.post("/role",this.form).then(res=>{
        if(res.code==='200') {
          this.$message.success("保存成功")
          this.dialogFormVisible=false
          this.load()
        }
        else {
          this.$message.success("保存失败")
        }

      })
    },

    handleCurrentChange(pageNum){
      this.pageNum=pageNum
      this.load()
    },
    selectMenu(role){

      this.menuDialogVis=true

      this.roleId=role.id
      this.roleFlag=role.flag
      this.request.get("/menu").then(res=>{
        this.menuData=res.data

        this.expends=this.menuData.map(v=>v.id)
      })

      this.request.get("/role/roleMenu/"+this.roleId).then(res=>{
        this.checks=res.data

            this.request.get("/menu/ids").then(res=>{
              const ids=res.data
              ids.forEach(id=>{
                if(!this.checks.includes(id)){
                  this.$refs.tree.setChecked(id,false)
                }
              })

            })

      })

    },
    saveRoleMenu(){
      this.request.post("/role/roleMenu/",this.roleId,this.$ref.tree.getCheckedKeys()).then(res=>{
        if(res.code==='200'){
          this.$message.success("绑定成功")
          this.menuDialogVis=false

          //操作管理员权限后需要重新登录
          if(this.roleFlag==='ROLE_ADMIN'){
            this.$router.push("/login")
            localStorage.removeItem("user")
            localStorage.removeItem("menus")
          }

        }else{
          this.$message.error("绑定失败")
        }
      })
    },
  }
}
</script>

<style>
.headerBg{
  background: #ccc!important;
}

</style>