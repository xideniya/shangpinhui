// 引入mockjs 模块
import Mock from 'mockjs'
// webpack 默认对外暴露 图片 、json数据格式
import banner from './banners.json'
import floor from './floors.json'
// 模拟轮播图数据
Mock.mock('/mock/banner', { code: 200, data: banner })
Mock.mock('/mock/floor', { code: 200, data: floor })
