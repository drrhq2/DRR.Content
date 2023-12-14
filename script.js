document.addEventListener("DOMContentLoaded", function () {
    const initialData = {
        labels: ["1.Risk Management", "2.Health", "3.Water & Sanitation", "4.Shelter", "5.Food & Nutrition Security", "6.Social Cohesion", "7.Inclusion", "Economic Opportunities", "8.Infrastructure & Services", "9.Natural Resource Management", "10.Connectedness"],
        datasets: [{
            label: "Community Score",
            backgroundColor: function (context) {
                var value = context.dataset.data[context.dataIndex];
                return value >= 0.8 ? "rgba(255, 0, 0, 0.2)" :
                    value >= 0.6 ? "rgba(255, 165, 0, 0.2)" :
                        value >= 0.4 ? "rgba(0, 128, 0, 0.2)" :
                            value >= 0.2 ? "rgba(210, 105, 30, 0.2)" :
                                "rgba(173, 216, 230, 0.2)";
            },
            borderColor: function (context) {
                var value = context.dataset.data[context.dataIndex];
                return value >= 0.8 ? "rgba(255, 0, 0, 1)" :
                    value >= 0.6 ? "rgba(255, 165, 0, 1)" :
                        value >= 0.4 ? "rgba(0, 128, 0, 1)" :
                            value >= 0.2 ? "rgba(210, 105, 30, 1)" :
                                "rgba(173, 216, 230, 1)";
            },
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: function (context) {
                var value = context.dataset.data[context.dataIndex];
                return value >= 0.8 ? "rgba(255, 0, 0, 1)" :
                    value >= 0.6 ? "rgba(255, 165, 0, 1)" :
                        value >= 0.4 ? "rgba(0, 128, 0, 1)" :
                            value >= 0.2 ? "rgba(210, 105, 30, 1)" :
                                "rgba(173, 216, 230, 1)";
            },
            data: [0.2, 0.4, 0.6, 0.8, 0.3, 0.7, 0.5, 0.9, 0.1, 0.8, 1]
        }]
    };

    const radarCanvas = document.getElementById("radarChart");
    const radarContext = radarCanvas.getContext("2d");

    const radarChart = new Chart(radarContext, {
        type: 'radar',
        data: initialData,
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    });

    function updateRadarChart(scores) {
        radarChart.data.datasets[0].data = scores;
        radarChart.update();
    }

    function updateHazardExposureBasedOnDistrict(selectedDistrict) {
        let scores;

        switch (selectedDistrict) {
            case "Akkar":
                scores = [0.8, 0.2, 0.7, 0.3, 0.4, 0, 0.1, 0.5, 0.8, 0.9, 0.7];
                break;
            case "Beirut":
                scores = [0.4, 0.5, 0.6, 0.8, 0.2, 0.7, 0.9, 0.3, 0.6, 0.1, 0.5];
                break;
            default:
                scores = Array.from({ length: 11 }, () => Math.random());
        }

        updateRadarChart(scores);
        updateHazardExposure(selectedDistrict);
    }

    const districtSelect = document.getElementById("districtSelect");

    function updateFilter(value) {
        console.log(`Selected District: ${value}`);
        updateHazardExposureBasedOnDistrict(value);
    }

    districtSelect.addEventListener("input", (e) => {
        updateFilter(e.target.value);
    });

    function updateHazardExposure(district) {
        const hazardBoxes = document.querySelectorAll(".hazard-box");

        let hazardDetails = [];

        switch (district) {
            case "Akkar":
                hazardDetails = [
                    { name: "Winter storm", icon: "❄️", details: getHazardDetails("Winter storm") },
                    { name: "Land slides", icon: "🏔️", details: getHazardDetails("Land slides") },
                    { name: "Flood", icon: "🌊", details: getHazardDetails("Flood") }
                ];
                break;
            default:
                // Add default values or leave it empty based on your requirements
                hazardDetails = [];
                break;
        }

        hazardBoxes.forEach((hazardBox, index) => {
            const hazardInfo = hazardDetails[index];
            updateHazardBox(hazardBox, hazardInfo);
        });
    }

    function updateHazardBox(hazardBox, hazardInfo) {
        if (hazardBox && hazardInfo) {
            hazardBox.innerHTML = `<div>${hazardInfo.icon}</div><div>${hazardInfo.name}</div>`;
            hazardBox.addEventListener("click", () => {
                updateHazardExposureDetails(hazardInfo.details);
            });
        } else {
            hazardBox.innerHTML = ""; // Clear the content if no hazard info
        }
    }

    function getHazardDetails(hazardName) {
        // Implement logic to retrieve details based on the hazard name
        // For now, I'll provide placeholder details for Winter storm
        if (hazardName === "Winter storm") {
            return {
                causeOrigin: " Cause/Origin: Temperature drop",
                warningSigns: "WarningSigns:Temperature drop",
                warningReceptionMethods: " warningReceptionMethods: Weather forecasts based on storm intensity and strength",
                fallingSpeed: "fallingSpeed: Depending on the weather",
                repetitionSeasonalRisk: "repetitionSeasonalRisk: Every Snow Storm",
                duration: "duration: 15 Days",
                exposedIndividuals: "exposedIndividuals:Entire Ersal Area",
                exposedPlaces: "exposedPlaces: Entire Ersal Area",
                earlyMeasures: "earlyMeasures: Preparing vehicles for snow removal, Preparing salt for ice melting",
                risksAssociated: "risksAssociated: Closing roads, Isolating the area, Tent collapse affected by the amount of ice"
              
            };
        }
        // Add conditions for other hazards as needed
        // else if (hazardName === "Land slides") {
        //     // Details for Land slides
        // }
        // else if (hazardName === "Flood") {
        //     // Details for Flood
        // }
        else {
            // Placeholder for other hazards
            return {};
        }
    }

    function updateHazardExposureDetails(details) {
        const hazardExposureBoxes = document.querySelectorAll(".hazard-exposure");

        if (details) {
            const {
                causeOrigin,
                warningSigns,
                warningReceptionMethods,
                fallingSpeed,
                repetitionSeasonalRisk,
                duration,
                exposedIndividuals,
                exposedPlaces,
                earlyMeasures,
                risksAssociated
            } = details;

            const exposureDetails = [
                causeOrigin,
                warningSigns,
                warningReceptionMethods,
                fallingSpeed,
                repetitionSeasonalRisk,
                duration,
                exposedIndividuals,
                exposedPlaces,
                earlyMeasures,
                risksAssociated
            ];

            hazardExposureBoxes.forEach((box, index) => {
                box.innerHTML = `<div><b>${exposureDetails[index]}</b></div>`;
            });

            // You can customize the rendering of details as needed
            // For example, you might want to create additional HTML elements for better styling
        } else {
            hazardExposureBoxes.forEach((box) => {
                box.innerHTML = ""; // Clear the content if no details
            });
        }
    }

});
