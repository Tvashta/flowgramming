/*
 # *************************************************************************************
 # Copyright (C) 2021 Ritwik Murali, Harshit Agarwal, Rajkumar S, Gali Mary Sanjana
 # This file is part of Flowgramming <https://github.com/flowgrammers-org/flowgramming>.
 #
 # Flowgramming is free software: you can redistribute it and/or modify
 # it under the terms of the GNU General Public License as published by
 # the Free Software Foundation, either version 3 of the License, or
 # (at your option) any later version.
 #
 # Flowgramming is distributed in the hope that it will be useful,
 # but WITHOUT ANY WARRANTY; without even the implied warranty of
 # MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 # GNU General Public License for more details.
 #
 # You should have received a copy of the GNU General Public License
 # along with Flowgramming.  If not, see <http://www.gnu.org/licenses/>.
 # *************************************************************************************
 */

function postReq(path, payload) {
    return fetch(path, {
        method: 'POST',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
}

function escapeHtml(string) {
    let entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;',
    }
    return String(string).replace(/[&<>"'`=\/]/g, function (s) {
        return entityMap[s]
    })
}
