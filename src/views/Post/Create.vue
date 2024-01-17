<template>
<div class="container">
    <div class="row">
        <div class="card">
            <div class="card-header">
               <h4>Add Student</h4>
               <RouterLink to="/posts" class="btn btn-primary">Back</RouterLink> 
            </div> 
            <div class="card-body">
                <form action="" enctype="multipart/form-data">
                    <div class="mb-3">
                        <label for="">Title</label>
                        <input type="text" v-model="model.post.title" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Category</label>
                        <input type="text" v-model="model.post.category" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label for="">Content</label>
                        <input type="text" v-model="model.post.content" class="form-control">
                    </div>
                    <div class="mb-3">
                        <label class="btn btn-success">
                            Upload Image
                            <input type="file"  @change="handleFileChange"  style="display: none" accept="image/*">
                        </label>
                        <img v-if="imageUrl" :src="imageUrl"  alt="Uploaded Image" style="max-width: 200px; margin-top: 10px;">
                    </div>
                    <div class="mb-3">
                       <button type="button" @click="savePost" class="btn btn-primary" >Add Post</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
</div>

</template>
    
    <script>
    import axios from 'axios'
    export default {
        name: 'PostCreate',
        data(){
            return {
                imageUrl: null,
                model: {
                    post: {
                        title: '',
                        content: '',
                        category: '',
                    }
                },
               image: ''
            }
        },
        methods: {
            handleFileChange(e){
                const file = e.target.files[0]
                this.image = file

                if(file){
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        this.imageUrl = e.target.result
                    }
                    reader.readAsDataURL(file)
                }
            },
            async savePost(){
                console.log(this.model.post)
                const formData = new FormData();
                formData.append("image", this.image)
                formData.append("title", this.model.post.title)
                formData.append("content", this.model.post.content)
                formData.append("category", this.model.post.category)
               try {
               const res = await axios.post('http://127.0.0.1:3000/api/posts', formData)
                alert('successfully Created')
                this.$router.push('/posts')
               } catch (error) {
                console.log(error)
               }
            } 
        }
    }
    </script>