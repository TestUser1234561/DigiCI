export function rails_data(id) {
    let ele = document.getElementById(id);
    let data = ele.dataset['props'];
    ele.remove();
    try {
        return JSON.parse(data);
    } catch(e) {
        return false;
    }
}