

  var constraints = {
    name: {
     
      presence: true,
     
      length: {
        minimum: 3,
      },
      format: {
        
        pattern: "[a-z ]+",
       
        flags: "i",
        message: "can only contain letters"
      }
    },
    email: {
     
      presence: true,
     
      email: true
    },
    address: {
     
      presence: true,
     
      length: {
        minimum: 3,
        maximum: 20
      },
      
    },
    password: {
      
      presence: true,
     
      length: {
        minimum: 5
      }
    },

    birthday: {
      
      presence: true,
     
      
    },
    phone: {
    
      presence: true,
      
      length: {
        minimum: 8
      }
    },
    verification: {
     
      presence: true,
     
      inclusion: {
        within: ["DL","MC", "PP"],
        
        message: "^Please choose a method"
      }
    },
    
  };

 
  var form = document.querySelector("form");
  form.addEventListener("submit", function(ev) {
    ev.preventDefault();
    handleFormSubmit(form);
  });

  
  var inputs = document.querySelectorAll("input, textarea, select");
  console.log(inputs);
  for (var i = 0; i < inputs.length; ++i) {
    inputs.item(i).addEventListener("change", function(ev) {

      var errors = validate(form, constraints) || {};
      showErrorsForInput(this, errors[this.name])
    });
  }

  function handleFormSubmit(form, input) {
    
    var errors = validate(form, constraints);
    
    showErrors(form, errors || {});
    if (!errors) {
      showSuccess();
    }
  }

  
  function showErrors(form, errors) {
    
    form.querySelectorAll("input[name], select[name]").forEach( function(input) {
      
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }

 
  function showErrorsForInput(input, errors) {
   
    var formGroup = closestParent(input.parentNode, "form-group")
    
      , messages = formGroup.querySelector(".messages");
    
    resetFormGroup(formGroup);
    
    if (errors) {
      
      formGroup.classList.add("has-error");
      
      errors.forEach(function(error) {
        addError(messages, error);
      });
    } else {
      
      formGroup.classList.add("has-success");
    }
  }

 
  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }
    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
  
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    
    formGroup.querySelectorAll(".help-block.error").forEach(function(el) {
      el.parentNode.removeChild(el);
    });
  }

 
  function addError(messages, error) {
    var block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerText = error;
    messages.appendChild(block);
  }

  function showSuccess() {
  
    alert("Success!");
  }
