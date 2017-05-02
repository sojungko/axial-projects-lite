"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var projects = [
            {
                id: 1,
                headline: 'African Mining',
                target_check_size_min: 200000,
                target_check_size_max: 500000,
                target_revenue_min: 300000,
                target_revenue_max: 600000,
                target_ebitda_min: 400000,
                target_ebitda_max: 700000
            },
            {
                id: 2,
                headline: 'Tokyo Hack Reactor',
                target_check_size_min: 200000,
                target_check_size_max: 500000,
                target_revenue_min: 300000,
                target_revenue_max: 600000,
                target_ebitda_min: 400000,
                target_ebitda_max: 700000
            },
            {
                id: 3,
                headline: 'Uber',
                target_check_size_min: 200000,
                target_check_size_max: 500000,
                target_revenue_min: 300000,
                target_revenue_max: 600000,
                target_ebitda_min: 400000,
                target_ebitda_max: 700000
            },
            {
                id: 4,
                headline: 'Bubble',
                target_check_size_min: 200000,
                target_check_size_max: 500000,
                target_revenue_min: 300000,
                target_revenue_max: 600000,
                target_ebitda_min: 400000,
                target_ebitda_max: 700000
            }
        ];
        return { projects: projects };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map