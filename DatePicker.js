function DatePicker(id, callback) {
    this.id = id;
    this.div = document.getElementById(String(this.id));
    this.callback = callback;
    this.daysInMonth = function(month, year) {
        return new Date(year, month, 0).getDate();
    };
    this.drawHeader = function(month, year) {
        let months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        let nav = document.createElement("div");
        nav.className = "navigation";

        /*** Prev Button ***/
        let prev = document.createElement("button");
        prev.className = "button prev pulse";
        prev.innerHTML = "&#10094;";
        prev.addEventListener("click", () => {
            this.render(new Date(year, month - 2));
        });
        nav.appendChild(prev);

        /*** Next Button ***/
        let next = document.createElement("button");
        next.className = "button next pulse";
        next.innerHTML = "&#10095;";
        next.addEventListener("click", () => {
            this.render(new Date(year, month));
        });
        nav.appendChild(next);

        /*** Month and Year ***/
        let monthHeader = document.createElement("div");
        monthHeader.innerHTML = months[month - 1] + " " + String(year);
        nav.appendChild(monthHeader);

        this.div.appendChild(nav);
    };
    this.drawCalendar = function(month, year) {
        /*** CALENDAR ***/
        let calendar = document.createElement("table");
        calendar.className = "calendar";

        let weekdays = document.createElement("tr");
        ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].forEach(day => {
            let p = document.createElement("th");
            p.innerHTML = day;
            weekdays.append(p);
        });
        weekdays.className = "weekdays";
        calendar.append(weekdays);

        let offset = new Date(year, month, 1).getDay();
        let i = 1;
        let len = offset + this.daysInMonth(month, year);

        let daysInPrevMonth = this.daysInMonth(month - 1, year);
        while (i <= len) {
            let row = document.createElement("tr");
            let count = 0;
            while (count++ < 7) {
                let data = document.createElement("td");
                if (i <= offset) {
                    data.innerHTML = String(daysInPrevMonth - offset + i);
                    data.className = "dimmed";
                } else if (i > offset && i <= len) {
                    data.innerHTML = String(i - offset);
                    data.addEventListener("click", () =>
                        this.callback(this.id, {
                            day: data.innerHTML,
                            month: month,
                            year: year
                        })
                    );
                } else if (i > len) {
                    data.innerHTML = String(i - len);
                    data.className = "dimmed";
                }
                row.appendChild(data);
                i++;
            }
            calendar.append(row);
        }
        this.div.appendChild(calendar);
    };
}

DatePicker.prototype.render = function(date) {
    while (this.div.firstChild) {
        this.div.removeChild(this.div.firstChild);
    }
    this.drawHeader(date.getMonth() + 1, date.getFullYear());
    this.drawCalendar(date.getMonth() + 1, date.getFullYear());
};
