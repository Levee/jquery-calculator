$(ready);

let operator = '+';

function ready(){
  console.log('JS and jQuery ready for action!');
  refreshHistory();
  $('#equals').on('click', calc);
  $('#add').on('click', () => {
    operator = '+';
    $('.operator').css('border', '3px solid #efefef');
    $('#add').css('border', '3px solid lime');
  });
  $('#sub').on('click', () => {
    operator = '-';
    $('.operator').css('border', '3px solid #efefef');
    $('#sub').css('border', '3px solid lime');
  });
  $('#mul').on('click', () => {
    operator = '*';
    $('.operator').css('border', '3px solid #efefef');
    $('#mul').css('border', '3px solid lime');
  });
  $('#div').on('click', () => {
    operator = '/';
    $('.operator').css('border', '3px solid #efefef');
    $('#div').css('border', '3px solid lime');
  });
  $('#clear').on('click', () => {
    $('input').val('');
  });
  // $('#delete').on('click', () => {
  //   $.ajax({
  //     method: 'DELETE',
  //     url: '/calc',
  //     }).then((res) => {
  //       console.log('Success!', res);
  //     }).catch((res) => {
  //       alert('Request failed. Try again later.');
  //     }
  //   );
  // });
}

function calc(){
  console.log('in calc');
  if(!($('#num1').val()) || !($('#num2').val())){
    alert('Error! Inputs must contain a valid number.');
    return;
  }
  const num1 = Number($('#num1').val());
  const num2 = Number($('#num2').val());
  const calcObj = {
    num1: num1,
    num2: num2,
    operator: operator
  }
  $.ajax({
    method: 'POST',
    url: '/calc',
    data: calcObj,
    }).then((res) => {
      console.log('Success!', res);
    }).catch((res) => {
      alert('Request failed. Try again later.');
    }
  );

  $.ajax({
    method: 'GET',
    url: '/calc',
    }).then((res) => {
      console.log('Success!', res);
      $('#answer').text(res[res.length - 1].ans);
      $('#history').empty();
      $('input').val('');
      for(let i = res.length - 1; i >= 0; i--){
        $('#history').append(`
          <li>${res[i].num1} ${res[i].operator} ${res[i].num2} = ${res[i].ans}</li>
        `);
      }
    }).catch((res) => {
      alert('Request failed. Try again later.');
    }
  );
}

function refreshHistory(){
  $.ajax({
    method: 'GET',
    url: '/calc',
    }).then((res) => {
      for (let i = res.length - 1; i >= 0; i--) {
        $('#history').append(`
          <li>${res[i].num1} ${res[i].operator} ${res[i].num2} = ${res[i].ans}</li>
        `);
      }
    }).catch((res) => {
      alert('Request failed. Try again later.');
    }
  );
}