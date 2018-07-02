<template>
        <section id="header">
            <nav class="navbar navbar-expand-sm fixed-top bg-dark text-light">
                <div class="container-fluid">
                    <ul class="navbar-nav float-left">
                        <li class="nav-item p-0 m-0">
                            <a href="#" class="nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fas fa-tasks"></i>
                            </a>
                        </li>
                    </ul>
                    <ul class="navbar-nav navbar-center">
                        <li class="nav-item">
                            <router-link to="/"><span class="float-right">Amazing Kanban</span></router-link>
                        </li>
                    </ul>
                </div>
            </nav>
        </section>
</template>
<script>
/* eslint-disable */

export default {
    name : 'HeaderKanban',
};
</script>

<style>
.nav-link i {
    padding: 0;
    margin: 0;
    font-size: 18px;
    color: #ffffff
}
.nav-item span.float-right{
    color: #ffffff;
}
</style>


