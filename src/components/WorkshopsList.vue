<template>
        <div>
            <div class="row">
                <div class="col-12 clearfix">
                    <h1>
                        Workshops
                        <div class="float-right">
                            <button class="btn btn-sm btn-primary" @click="toggleDetails">
                                {{showDetails ? 'Hide Details' : 'Show Details'}}
                            </button>
                        </div>
                    </h1>
                    <hr />
                </div>
            </div>

            <div class="row" v-if="status==='LOADING'">
                <div class="col-12">
                    <div class="alert alert-primary alert-dismissible fade show" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <strong>workshops Loading</strong> 
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
                        <strong>{{error.message}}</strong>
                    </div>
                </div>
            </div>


    
            <div class="row" v-if="status==='LOADED'">
                <div class="col-4 d-flex" v-for="workshop in workshops" :key="workshop.id">
                    <router-link :to="{name:'workshops-details', params:{id: workshop.id}}" class="text-reset text-decoration-none w-100 my-3 d-flex flex-column">
                        <div class="card">
                            <div class="card-body">
                                <div class="card-img-container d-flex flex-column justify-content-center">
                                    <img class="card-img-top w-50 d-block mx-auto" :src="workshop.imageUrl" :alt="workshop.name" />
                                </div>
                                <h4 class="card-title">{{workshop.name}}</h4>
                                <div class="card-text">
                                    <div>
                                        {{formatDate(workshop.startDate)}}  -  {{formatDate(workshop.endDate)}}
                                    </div>
                                    <div>
                                        <span>{{workshop.time}}</span>
                                    </div>
                                    <div class="my-3" v-if="showDetails" v-html="workshop.description"></div>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
    
    </div>
</template>

<script>
import { fetchWorkshops } from '../services/workshops'
const LOADING = 'LOADING', LOADED = 'LOADED', ERROR_LOADING = 'ERROR_LOADING';

export default {
    name:'WorkshopsList',
    data() {
        return {
            status:LOADING,
            showDetails:false
        }
    },
    methods:{
        toggleDetails(){
            this.showDetails = !this.showDetails;
        },
        formatDate( isoDate ) {
             const date = new Date( isoDate );
             return date.toDateString();
        }

    },
    mounted(){
        fetchWorkshops()
        .then(workshops => {
            this.status = LOADED;
            this.workshops  = workshops;
        })
        .catch( error => {
            this.status = ERROR_LOADING;
            this.error = error;

        });
    }
}
</script>

<style scoped>
.card {
    cursor: pointer;
}
.card:hover {
    box-shadow: 0px 0px 4px 0px goldenrod;
    background-color: #fcfcfc;
}
.card-img-container {
    min-height: 150px;
    margin: 10px 0;
}
</style>