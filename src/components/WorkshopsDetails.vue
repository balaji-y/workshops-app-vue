<template>
    <div>
        <div class="row" v-if="status==='LOADING'">
                    <div class="col-12">
                        <div class="alert alert-primary alert-dismissible fade show" role="alert">
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                <span class="sr-only">Close</span>
                            </button>
                            <strong>workshop Loading</strong> 
                        </div>
                    </div>
        </div>

        <div class="row" v-if="status==='ERROR_LOADING'">
                <div class="col-12">
                    <div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>{{error}}</strong>
                    </div>
                </div>
        </div>

        <div class="row" v-if="status==='LOADED'">
            <div class="col-12 clearfix">
                <div class="row">
                    <h2>
                        {{workshop.name}}
                    </h2>
                    <hr style="width:100%;text-align:left;margin-left:0">
                   
                    <div class="row my-4">
                        <div class="col-4">
                            <img class="img-fluid" :src="workshop.imageUrl" :alt="workshop.name" />
                        </div>
                        <div class="col-8">
                            <div class="row">
                                <div class="col-3">
                                    <p>
                                        <small>
                                            {{formatDate(workshop.startDate)}} - {{formatDate(workshop.endDate)}}
                                        </small>
                                    </p>
                                    <p>
                                        <small class="text-muted">
                                            {{workshop.time}}
                                        </small>
                                    </p>
                                </div>
                                <div class="col-3">
                                    <p> 
                                        <i :class="workshop.modes.online? 'fa fa-check' :'fa fa-times'">
                                            <small>Online</small>
                                        </i>
                                        
                                    </p>
                                    <p>
                                       <i :class="workshop.modes.inPerson? 'fa fa-check' :'fa fa-times'">
                                            <small>In Person</small>
                                        </i>
                                        
                                    </p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12" v-html="workshop.description"></div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>

        <Session :workshopId = "this.$route.params.id" />
    </div>
</template>

<script>
import {fetchWorkshop} from '../services/workshops-details';
import Session from '@/components/Session.vue';


const LOADING = 'LOADING' , LOADED='LOADED', ERROR_LOADING = 'ERROR-LOADING'
export default {
    name:'WorkshopsDetails',
    components:{
        Session
    },
    data(){
        return {
            status:LOADING, 
        }
    },

    methods:{
        formatDate( isoDate ) {
            const date = new Date( isoDate );
            return date.toDateString();
        }
        
        
    },
    mounted(){
        fetchWorkshop(this.$route.params.id)
        .then(workshop => {
            this.status = LOADED;
            this.workshop = workshop;
        })
        .catch(error => {
            this.status = ERROR_LOADING;
            this.error = error;
        });
    }  
}
</script>

<style>
.session-style{
    border:1px solid lightgray;
    padding:20px 10px;
    border-radius: 4px;
}

</style>