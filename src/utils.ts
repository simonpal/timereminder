export function genUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }

  export const dialogOptions = {
    type: "info",
    buttons: ["Delete", "Cancel"],
    message: "Are you sure you want to delete this item?"
  };