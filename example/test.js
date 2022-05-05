import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  stages: [
    { duration: '30s', target: 20 },
    { duration: '4m30s', target: 10 },
    { duration: '20s', target: 0 },
  ],
  thresholds: {
    'http_reqs{expected_response:true}': ['rate>10'],
  },
};

export default function () {
  const res = http.get('https://httpbin.test.k6.io/');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
