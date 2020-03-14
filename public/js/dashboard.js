$(document).ready(function () {
    var medicationForm = $("form.add_medication");
    var name = $("input#name");
    var dosage = $("input#dosage");
    var quantity = $("input#quantity");
    var frequency = $("input#frequency");
    var medtable = $("#currentMeds")
    var deleteBtn = $(".deleteMedication")


    var medications;

    medicationForm.on("submit", function (event) {
        event.preventDefault();
        var medData = {
            name: name.val().trim(),
            dosage: dosage.val().trim(),
            quantity: quantity.val().trim(),
            frequency: frequency.val().trim()
        };

        if (!medData.name || !medData.dosage || !medData.quantity || !medData.frequency) {
            return;
        }

        addMedication(medData.name, medData.dosage, medData.quantity, medData.frequency);
        name.val("");
        dosage.val("");
        quantity.val("");
        frequency.val("");

        location.reload();
    });

    function addMedication(name, dosage, quantity, frequency) {
        $.post("/api/medications", {
            name: name,
            dosage: dosage,
            quantity: quantity,
            frequency: frequency
        })
    }

    function handleErr(err) {
        console.log("There was an error.")
        console.log(err.responseJSON)
    }

    function getMeds() {
        $.get("/api/medications", function (data) {
            medications = data
            console.log("Medications", data);
            initializeRows()
        })
    }

    function initializeRows() {
        medtable.empty()
        var medstoadd = [];
        for (var i = 0; i < medications.length; i++) {
            medstoadd.push(medications[i]);
        }
        console.log(medstoadd)

        for (var i = 0; i < medstoadd.length; i++) {
            newRow(medstoadd[i])
            console.log(medstoadd[i])
        }
    }

    function newRow(medication) {
        console.log(medication.name)
        var medRow = $("<tr>")
        var medNameCell = $(`<td>${medication.name}</td>`)
        var medDosageCell = $(`<td>${medication.dosage}</td>`)
        var medQuantityCell = $(`<td>${medication.quantity}</td>`)
        var medFrequencyCell = $(`<td>${medication.frequency}</td>`)
        var deleteButton = $(`<td><button class="waves-effect waves-light btn-small red deleteMedication" data-id="${medication.id}"><i
        class="material-icons prefix">delete</i></button></td>`)

        medRow.append(medNameCell)
        medRow.append(medDosageCell)
        medRow.append(medQuantityCell)
        medRow.append(medFrequencyCell)
        medRow.append(deleteButton)
        medtable.append(medRow)

    }

    function deleteMed(id) {
        $.ajax({
            method: "DELETE",
            url: "/api/medications/" + id
        }).then(function () {
            getMeds()
        })
    }


    $(document).on("click", "button.deleteMedication", function () {
        let id = ($(this).attr("data-id"));
        deleteMed(id)


    })
    getMeds()
});
