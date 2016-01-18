(function () {
    'use strict';

    angular
        .module('app')
        .controller('ReportingController', ReportingController);

    ReportingController.$inject = ['ReportingService'];
    function ReportingController (ReportingService) {
        var vm = this;
        vm.usersTotal = "";
        vm.usersMonth= "";
        vm.salon = "";
        vm.salonEli = "";
        vm.quizByUser = "";
        vm.quizBySalon = "";
        vm.vente = "";
        vm.venteMonth = "";
        vm.venteByUser = "";
        vm.venteBySalon = "";
        vm.pointUsers = "";
        vm.pointSalon = "";
        vm.pointUsing = "";
        vm.present = "";
        initController();

        // Private functions
        function initController() {
            ReportingService.DownloadInfo().then(function(response){
                vm.usersTotal = response.data.ut;
                vm.usersMonth = response.data.um;
                vm.salon = response.data.salon;
                vm.salonEli = response.data.salonEli;
                vm.quizByUser = response.data.quizByUser;
                vm.quizBySalon = response.data.quizBySalon;
                vm.vente = response.data.vente;
                vm.venteMonth = response.data.venteMonth;
                vm.venteByUser = response.data.venteByUser;
                vm.venteBySalon = response.data.venteBySalon;
                vm.pointUsers = response.data.pointUsers;
                vm.pointSalon = response.data.pointSalon;
                vm.pointUsing = response.data.pointUsing;
                vm.present = response.data.present;
            });
        }

    }
})();