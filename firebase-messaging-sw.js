importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js');

// Don't move click location in the file, if you add after initializeApp. Click is not functioning in Firefox.
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
	// todo change your default url
    var target = 'YOUR DEFAULT URL';
    if ( event.notification.data.click_action !== ''){
        target = event.notification.data.click_action;
    }
    event.waitUntil(clients.matchAll({
        type: "window"
    }).then(function(clientList) {
        for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url == target && 'focus' in client)
                return client.focus();
        }
        if (clients.openWindow)
            return clients.openWindow(target);
    }));
});
self.addEventListener('notificationclose', function(event) {
//... Do your stuff here, if you want sent some analysis for closed notifications.
});


// todo get this information from Firebase panel -> General Tab -> Your Apps Section
var firebaseConfig = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: "",
	appId: ""
};

var messaging = firebase.messaging();

self.addEventListener('install', (event) => {
    console.log('Service worker installed');
});
messaging.setBackgroundMessageHandler(function(payload) {
    const notificationTitle = payload.data.title;
    let notificationOptions = {
        body: payload.data.body,
        icon: payload.data.icon,
        timestamp: +new Date,
        badge: payload.data.badge,
        data : {
            click_action : payload.data.click_action
        }
    };
    if (payload.data.image) {
        notificationOptions["image"] = payload.data.image;
    };
    return self.registration.showNotification(notificationTitle, notificationOptions )
});