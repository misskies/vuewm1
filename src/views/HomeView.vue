<template>
    <el-container style="height: 100vh">
      <el-aside width=" sideWidth+'px' "  style="background-color: rgb(238, 241, 246);box-shadow: 2px 0 6px rgb(0,21,41)">
        <el-menu :default-openeds="['1', '3']" style="min-height: 100% ;overflow-x: hidden"
                 background-color="rgb(48,65,86)"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 :collapse-transition="false"
                 :collapse="isCollapse"
        >


          <div style="height: 60px;line-height: 60px;text-align: center">

            <img src="../assets/logo.png" alt="" style="width:20px ;position: relative;top:5px;margin-right: 5px" >
            <b style="color: white">
              <span slot="title" v-show="logoTextShow">收银后台管理系统</span>
            </b>

          </div>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>
              <span slot="title">人员管理</span>
            </template>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>
              <span slot="title">人员管理</span>
            </template>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>
              <span slot="title">人员管理</span>
            </template>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="height:10px;text-align: right; font-size: 12px;display: flex">
          <div style="flex:1;font-size: 18px;text-align: left">
            <span :class="collapseBtnClass" style="cursor:pointer" @click="collapse"></span>
          </div>

          <el-dropdown style="width: 100px;cursor: pointer">
            <span>王小虎</span><i class="el-icon-arrow-down" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人信息</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>

        <el-main>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
          </el-breadcrumb>

          <div style="margin: 10px 0" >

            <el-input style="width:200px" placeholder="请输入人员名称" suffix-icon="ei-icon-search" v-model="username"></el-input>
            <el-input style="width:200px" placeholder="请输入邮箱" suffix-icon="ei-icon-message" v-model="email"></el-input>
            <el-input style="width:200px" placeholder="请输入地址" suffix-icon="ei-icon-position" v-model="address"></el-input>
            <el-button class="ml-5" type="primary" @click="load">搜索</el-button>
          </div>

          <div style="margin: 10px 0">
            <el-button type="primary">新增<i class="el-icon-circle-plus"></i></el-button>
            <el-button type="danger">批量删除<i class="el-icon-remove-outline"></i></el-button>
            <el-button type="primary">导入<i class="el-icon-bottom"></i></el-button>
            <el-button type="primary">导出<i class="el-icon-top"></i></el-button>
          </div>

          <el-table :data="tableData" border stripe header-cell-class-name="headerBg">
            <el-table-column prop="id" label="ID" width="80">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="140">
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" width="120">
            </el-table-column>
            <el-table-column prop="phone" label="电话">
            </el-table-column>
            <el-table-column prop="email" label="邮箱">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="success">编辑<i class="el-icon-edit"></i></el-button>
                <el-button type="danger">删除<i class="el-icon-remove"></i></el-button>
              </template>
            </el-table-column>
          </el-table>


          <div style="padding: 10px 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNum"
                :page-sizes="[2, 5, 10, 20]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>


import request from "@/utils/request";

export default {
  name: 'HomeView',

  data() {
    return {
      tableData: [],
      total:0,
      pageNum:1,
      pageSize:2,
      collapseBtnClass:"el-icon-s-fold",
      isCollapse:false,
      sideWidth: 200,
      logoTextShow:true,
      username:"",
      email:"",
      address:""
    }
  },
  created() {
    this.load()
  },
  methods:{
      collapse(){
        this.isCollapse=!this.isCollapse
        if(this.isCollapse){
          this.sideWidth=64
          this.collapseBtnClass="el-icon-s-unfold"
          this.logoTextShow=false
        }
        else{
          this.sideWidth=200
          this.collapseBtnClass="el-icon-s-fold"
          this.logoTextShow=true

        }
      },
      load(){
        request.get("http://localhost:9090/user/page",{
          params:{
            pageNum:this.pageNum,
            pageSize:this.pageSize,
            username:this.username,
            email:this.email,
            address:this.address
          }
        }).then(res=>{
          console.log(res)
          this.tableData=res.records
          this.total=res.total
        })

      },
      handleSizeChange(pageSize){
        this.pageSize=pageSize
        this.load()
      },

      handleCurrentChange(pageNum){
        this.pageNum=pageNum
        this.load()
      }

  }
}
</script>
<style>
.headerBg{
  background: #ccc!important;
}
</style>

