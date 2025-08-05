import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
    stages: [
        { duration: '10s', target: 10 },   
        { duration: '20s', target: 50 },  
        { duration: '30s', target: 100 },
        { duration: '20s', target: 50 },
        { duration: '10s', target: 20 },
        { duration: '60s', target: 40 },
        { duration: '60s', target: 100 },
    ]
};

export default function () {
    let url = 'http://linuxtips-eks-cluster-3431140dfbe6e9a8.elb.us-east-1.amazonaws.com/system';
    let params = {
        headers: {
            'Host': 'chip.danielbr.me'
        }
    };

    let res = http.get(url, params);

    check(res, {
        'Status 200': (r) => r.status === 200,
        'Tempo de resposta < 500ms': (r) => r.timings.duration < 500,
    });

    sleep(1);
}
