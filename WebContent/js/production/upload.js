var i=1;
layui.use('upload', function(){
		  var $ = layui.jquery
		  ,upload = layui.upload;
		  var demoListView = $('#demoList')
		  ,uploadListIns = upload.render({
		    elem: '#testList'			//指向容器选择器，如：elem: '#id'
		    ,url: '/lx/upload/upload_addPhoto'
		    ,accept: 'file'
		    ,multiple: true
		    ,auto: false
		    ,bindAction: '#testListAction' //指向一个按钮触发上传，一般配合 auto: false 来使用
		    ,choose: function(obj){   
		      var files = this.files = obj.pushFile(); //将每次选择的文件追加到文件队列
		      //读取本地文件
		      obj.preview(function(index, file, result){
		        var tr = $(['<tr id="upload-'+ index +'">'
		        	,'<td>'+ (i++) +'</td>'
		          ,'<td>'+ file.name +'</td>'
		          ,'<td>'+ (file.size/1014).toFixed(1) +'kb</td>'
		          ,'<td>等待上传</td>'
		          ,'<td>'
		            ,'<button class="layui-btn layui-btn-xs demo-reload layui-hide">重传</button>'
		            ,'<button class="layui-btn layui-btn-xs layui-btn-danger demo-delete">删除</button>'
		          ,'</td>'
		        ,'</tr>'].join(''));
		        //单个重传
		        tr.find('.demo-reload').on('click', function(){
		          obj.upload(index, file);
		        });
		        
		        //删除
		        tr.find('.demo-delete').on('click', function(){
		          delete files[index]; //删除对应的文件
		          tr.remove();
		          uploadListIns.config.elem.next()[0].value = ''; //清空 input file 值，以免删除后出现同名文件不可选
		        });
		        
		        demoListView.append(tr);
		      });
		    }
		    ,done: function(res, index, upload){
		    console.log("res===="+res);
		      if(res.code == 0){ //上传成功
		        var tr = demoListView.find('tr#upload-'+ index)
		        ,tds = tr.children();
		        tds.eq(2).html('<span style="color: #5FB878;">上传成功</span>');
		        tds.eq(3).html(''); //清空操作
		        return delete this.files[index]; //删除文件队列已经上传成功的文件
		      }
		      this.error(index, upload);
		    }
		    ,error: function(index, upload){
		      var tr = demoListView.find('tr#upload-'+ index)
		      ,tds = tr.children();
		      tds.eq(2).html('<span style="color: #FF5722;">上传失败</span>');
		      tds.eq(3).find('.demo-reload').removeClass('layui-hide'); //显示重传
		    }
		    
		  });})