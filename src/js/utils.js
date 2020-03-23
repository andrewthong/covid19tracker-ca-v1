var utils = (function() {
    var date = {
        toShortFormat: function(dt) {
            var date = dayjs(dt);
            var month_names =["Jan","Feb","Mar",
                                "Apr","May","Jun",
                                "Jul","Aug","Sep",
                                "Oct","Nov","Dec"];
            console.log('flag1', date.format("MMM D"));
            return date.format("MMM D");
        },
    };
    return {
        date: date,
    };
})();