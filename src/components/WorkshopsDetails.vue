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
                    <hr />
                   
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

        <div class="row" v-if="status==='LOADED'">
            <div class="col-12">
                <div class="row">
                    <h2>Sessions in this Workshop</h2>
                </div>
            </div>
            <hr />
            <div class="col-12">
                <div class="row session-style" v-for="(session,index) in sessions" :key="session.id">
                    <div class="col-1">
                        <span style="font-size:2em" @click="upvote(session.id,index)">
                            <i class="fas fa-caret-up"></i>
                        </span>
                        <br />
                        <span>{{session.upvoteCount}}</span>
                        <br/>
                        <span style="font-size:2em" @click="downvote(session.id,index)">
                            <i class="fas fa-caret-down"></i>
                        </span>
                    </div>
                    <div class="col-11">
                        <div>
                            {{session.name}}
                            <p style="font-weight:bold">by {{session.speaker}}</p>
                        </div>
                        
                        <span class="pb-1 pl-1 pr-1 bg-success text-white rounded font-weight-bold" v-if="session.level==='Basic'"><small>{{session.level}}</small></span>
                        <span class="pb-1 pl-1 pr-1 bg-info text-white rounded font-weight-bold" v-if="session.level==='Intermediate'"><small>{{session.level}}</small></span>
                        <span class="pb-1 pl-1 pr-1 bg-warning text-white rounded font-weight-bold" v-if="session.level==='Advanced'"><small>{{session.level}}</small></span>
                        
                        <p class="mt-2">{{session.duration}} hours</p>
                        <p>{{session.abstract}}</p>
                    </div>
                </div>
            </div>
                        
        </div>
    </div>
</template>

<script>
import {fetchWorkshop, fetchWorkshopSessions, upvoteSession, downvoteSession} from '../services/workshops-details';
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
Vue.use(VueToast);


const LOADING = 'LOADING' , LOADED='LOADED', ERROR_LOADING = 'ERROR-LOADING'
export default {
    name:'WorkshopsDetails',
    data(){
        return {
            status:LOADING,
            sessions: []
        }
    },

    methods:{
        formatDate( isoDate ) {
            const date = new Date( isoDate );
            return date.toDateString();
        },
        upvote(sessionid,index){
            this.sessions[index].upvoteCount+=1;

            upvoteSession(sessionid)
            .then( session => {
                console.log("success upvoting",session);
            })
            .catch( error => {
                console.log("error",error);
            });

            Vue.$toast.success(`Your Vote for ${this.sessions[index].name} was registered`,{
                position:'bottom-right'
            })

           
            
        },
        downvote(sessionid,index){
            this.sessions[index].upvoteCount-=1;

            downvoteSession(sessionid)
            .then( session => {
                console.log("success downvoting",session);
            })
            .catch( error => {
                console.log("error",error);
            });

            Vue.$toast.success(`Your Vote for ${this.sessions[index].name} was registered`,{
                position:'bottom-right'
            })
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

        fetchWorkshopSessions(this.$route.params.id)
        .then(sessions => {
            this.sessions = sessions;
            //console.log("sessions",this.sessions[6].name);
            this.sessions = this.sessions.filter(session => {
                return session.name!=undefined;
            });

            
           /* let basics = this.sessions.filter(session => session.level==='Basic');
            let intermediate = this.sessions.filter(session => session.level==='Intermediate');
            let advanced = this.sessions.filter(session => session.level==='Advanced');
            
            console.log(basics);
            console.log(intermediate);
            console.log(advanced);

            this.sessions = [...basics,...intermediate,...advanced];*/
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