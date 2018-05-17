export function rails_data(id) {
    let ele = document.getElementById(id);
    try {
        return JSON.parse(ele.dataset['props']);
    } catch(e) {
        return {};
    }
}