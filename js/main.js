let vacancies = [
    {
        name : 'Web Developer',
        quota : 3
    },
    {
        name : 'Mobile Developer',
        quota : 2
    },
    {
        name : 'System Administrator',
        quota : 1
    },
    {
        name : 'Database Administrator',
        quota : 0
    }
]

let positions = [
    'Bandung',
    'Jakarta',
]

let errors = {}

let applications = [

]

$(document).ready(function () {
    vacancies.forEach(function (vacancy) {
        let option = `<option value="${vacancy.name}">${vacancy.name}</option>`
        $('select#vacancy').append(option)
    })

    positions.forEach(function (position) {
        let option = `<option value="${position}">${position}</option>`
        $('select#position').append(option)
    })
})

$('#form-detail select[name="vacancy"]').on('change', function () {
    let value = this.value
    let quota = 0;
    vacancies.forEach(function(vacancy) {
        if (vacancy.name == value) {
            quota = vacancy.quota
        }
    })

    $(this).parent().children('div.helper, div.invalid-feedback').remove();
    $(this).removeClass('is-invalid');
    if (value) {
        let helper = document.createElement('div');
        helper.classList.add('helper')
        $('#form-detail [type="submit"]').disabled = false
        if (quota <= 0) {
            helper.innerHTML = `Mohon maaf, rekrutasi untuk ${value} sudah penuh.`
            helper.classList.remove('helper')
            helper.classList.add('invalid-feedback')
            $(this).addClass('is-invalid');
        } else if (quota <= 2) {
            helper.innerHTML = `Kuota tersisa untuk ${value} hanya ${quota} pendaftar`
        } else {
            helper.innerHTML = `Anda dapat memilih lowongan ${value}`

        }
        $(this).parent().append(helper);
    }
})


$('#form-detail').on('submit', function (e) {
    e.preventDefault();
    validateForm();

    $('#form-detail :input').each(function () {
        $(this).parent().children('div.invalid-feedback').remove();
        $(this).removeClass('is-invalid');
        if (errors.hasOwnProperty($(this).attr('name'))) {
            let errorMessage = document.createElement('div');
            errorMessage.classList.add('invalid-feedback');
            errorMessage.innerHTML = errors[$(this).attr('name')];
            $(this).parent().append(errorMessage);
            $(this).addClass('is-invalid');
        }

    })

    if (Object.keys(errors).length !== 0) {
        return false
    }

    let formData = {}
    $('#form-detail :input').each(function () {
        if (this.value) {
            formData[this.name] = this.value
        }
    })
    let formResult = ''
    formResult = formResult + `<dl>`
    formResult = formResult + `<dt style="font-weight: bold; margin-bottom: 16px">Anda merupakan pendaftar ke-${applications.length +1}</dt>`
    formResult = formResult + `<dt style="font-weight: bold">Full Name</dt><dd style="margin-bottom: 16px">${formData.fullname ?? ''}</dd>`
    formResult = formResult + `<dt style="font-weight: bold">E-mail</dt><dd style="margin-bottom: 16px">${formData.email ?? ''}</dd>`
    formResult = formResult + `<dt style="font-weight: bold">Phone Number</dt><dd style="margin-bottom: 16px">${formData.phonenumber ?? ''}</dd>`
    formResult = formResult + `<dt style="font-weight: bold">Vacancy</dt><dd style="margin-bottom: 16px">${formData.vacancy ?? ''}</dd>`
    formResult = formResult + `<dt style="font-weight: bold">Position</dt><dd style="margin-bottom: 16px">${formData.position ?? ''}</dd>`
    formResult = formResult + `<button style="padding: 5px 10px; border: none; background-color: rgb(172,225,231); cursor:pointer;" id="backButton">Kembali</button>`
    formResult = formResult + `</dl>`

    alert('Success! The data has been submitted successfully')

    applications.push(formData)
    vacancies.forEach(function (vacancy) {
        if (vacancy.name === formData.vacancy) {
            vacancy.quota--
        }
    })
    $(this).hide()
    $('#form-result').show()
    $('#form-result').html(formResult)
})

$('#form').on('click', '#backButton', function () {
    $('#form-detail').show()
    $('#form-detail').trigger('reset')
    $('#form-detail [name="vacancy"]').trigger('change')
    $('#form-result').hide()
})

function validateForm() {
    errors = {};

    $('#form-detail :input').each(function () {
        if (!this.value && this.name !== "") {
            errors[this.name] = this.name + ' wajib diisi'
            return true;
        }

        if (this.name === 'email') {
            let value = this.value;
            applications.forEach(function (application) {
                if (application.email === value) {
                    errors['email'] = 'email sudah terdaftar'
                    return true
                }
            })
        }

        if (this.name === 'vacancy') {
            let value = this.value
            vacancies.forEach(function (vacancy) {
                if (vacancy.name === value) {
                    if (vacancy.quota <= 0) {
                        errors['vacancy'] = `Mohon maaf, rekrutasi untuk ${value} sudah penuh.`
                    }
                }
            })
        }
    })
}