
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const cpuData = data.map(item => item.cpu_percent);
    const ramData = data.map(item => item.ram_percent);
    const diskData = data.map(item => item.disco.disk_percent);
    const tempData = data.map(item => item.cpu_temp['Core Max']);

    const labels = data.map((_, i) => ' ' + (i + 1));

    const updateChart = (ctx, label, values, color) => {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: label,
                    data: values,
                    borderColor: color,
                    fill: false
                }]
            }
        });
    };

    updateChart(document.getElementById('cpuChart'), 'Uso da CPU (%)', cpuData, 'rgba(75, 192, 192, 1)');
    updateChart(document.getElementById('ramChart'), 'Uso da RAM (%)', ramData, 'rgba(153, 102, 255, 1)');
    updateChart(document.getElementById('diskChart'), 'Uso do Disco (%)', diskData, 'rgba(255, 159, 64, 1)');
    updateChart(document.getElementById('tempChart'), 'Temp. Máxima da CPU (°C)', tempData, 'rgba(255, 99, 132, 1)');

    
    const last = data[data.length - 1];
    document.getElementById('cpuBar').style.width = last.cpu_percent + '%';
    document.getElementById('cpuBar').querySelector('.progress-text').innerText = last.cpu_percent + '%';

    document.getElementById('ramBar').style.width = last.ram_percent + '%';
    document.getElementById('ramBar').querySelector('.progress-text').innerText = last.ram_percent + '%';

    document.getElementById('diskBar').style.width = last.disco.disk_percent + '%';
    document.getElementById('diskBar').querySelector('.progress-text').innerText = last.disco.disk_percent + '%';

    document.getElementById('lastUpdated').innerText = 'Última atualização: ' + new Date().toLocaleString();
    document.querySelector('#cpuBar .progress-text').textContent = cpuUsage + '%';
  });

function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeToggleBtn');
  body.classList.toggle('dark-theme');

  if (body.classList.contains('dark-theme')) {
    btn.textContent = '🌙'; 
    localStorage.setItem('theme', 'dark');
  } else {
    btn.textContent = '☀️'; 
    localStorage.setItem('theme', 'light');
  }
}


window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const btn = document.getElementById('themeToggleBtn');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    btn.textContent = '🌙';
  } else {
    btn.textContent = '☀️';
  }

  btn.addEventListener('click', toggleTheme);
});
