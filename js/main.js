let vacancies = [
    'Web Developer',
    'Mobile Developer',
    'System Administrator',
    'Database Administrator'
]

let positions = [
    'Bandung',
    'Jakarta',
]

$(document).ready(function () {
    vacancies.forEach(function (vacancy) {
        let option = `<option value="${vacancy}">${vacancy}</option>`
        $('select#vacancy').append(option)
    })

    positions.forEach(function (position) {
        let option = `<option value="${position}">${position}</option>`
        $('select#position').append(option)
    })
})


$('#form-detail').on('submit', function (e) {
    e.preventDefault();
    let formData = {}
    $('#form-detail :input').each(function () {
        if (this.value) {
            formData[this.name] = this.value
        }
    })
    let formResult = ''
    formResult = formResult + `<dl>`
    formResult = formResult + `<dt style="font-weight: bold">Full Name</dt><dd style="margin-bottom: 16px">${formData.fullname ?? ''}</dd>`
    formResult = formResult + `<dt style="font-weight: bold">E-mail</dt><dd style="margin-bottom: 16px">${formData.email ?? ''}</dd>`
    formResult = formResult + `<dt style="font-weight: bold">Phone Number</dt><dd style="margin-bottom: 16px">${formData.phonenumber ?? ''}</dd>`
    formResult = formResult + `<dt style="font-weight: bold">Vacancy</dt><dd style="margin-bottom: 16px">${formData.vacancy ?? ''}</dd>`
    formResult = formResult + `<dt style="font-weight: bold">Position</dt><dd style="margin-bottom: 16px">${formData.position ?? ''}</dd>`
    formResult = formResult + `</dl>`

    alert('Success! The data has been submitted successfully')

    $(this).html(formResult)
})