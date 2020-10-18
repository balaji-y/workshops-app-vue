<template>
    <div class="row">
            <div class="col-12">
                <div class="row">
                    <h2>Sessions in this Workshop</h2>
                </div>
            </div>
          <hr style="width:100%;text-align:left;margin-left:0">
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
</template>

<script>
import {fetchWorkshopSessions, upvoteSession, downvoteSession} from '../services/workshops-details';
import Vue from 'vue';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';
Vue.use(VueToast);

export default {
    name:"Session",
    props:['workshopId'],
    data(){
        return {
             sessions: []
        }
    },

    methods:{
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
        fetchWorkshopSessions(this.workshopId)
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

</style>