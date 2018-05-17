export function rails_data(id) {
    let ele = document.getElementById(id);
    return JSON.parse(ele.dataset['props']);
}