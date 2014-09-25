/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function() {
	// Load plugin specific language pack
	tinymce.PluginManager.requireLangPack('eomarvin3d');

	tinymce.create('tinymce.plugins.Eomarvin3dPlugin', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceEomarvin3d');
			ed.addCommand('mceEomarvin3d', function() {
				ed.windowManager.open({
				file : ed.getParam("moodle_plugin_base") + 'eomarvin3d/marvin.php',
				//	file : url + '/marvin.htm',
					width : 650 + parseInt(ed.getLang('eomarvin3d.delta_width', 0)),
					height : 650 + parseInt(ed.getLang('eomarvin3d.delta_height', 0)),
					inline : 1,
					encoding : "xml"

				}, {
					plugin_url : url, // Plugin absolute URL
					some_custom_arg : 'custom arg' // Custom argument
				});
			});

			ed.contentCSS.push(url + '/css/content.css');

			// Register eomarvin3d button
			ed.addButton('eomarvin3d', {
				title : 'Insert 3D Structure',
				cmd : 'mceEomarvin3d',
				image : url + '/img/eomarvin3d.gif'
			});

			

			///select button
			ed.onNodeChange.add(function(ed, cm, n, co) {
			    n = ed.dom.getParent(n, 'span.mar3d');
 
			   // cm.setDisabled('eomarvin2dstudent', co);
			    cm.setActive('eomarvin3d', 0);
 
		    // Activate all
		    if (n) {
		        do {
		           // cm.setDisabled('eomarvin2dstudent', 0);
		            cm.setActive('eomarvin3d', 1);
		        } while (n = n.parentNode);
			    }
			});

			/*
			ed.onPreProcess.add(function(ed, o) {
			    tinymce.each(ed.dom.select('span.mar3d', o.node), function(n) {
			        ed.dom.replace(ed.dom.create('mar3d', null, n.innerHTML), n);
			    });
			    });

			*/


		},

		/**
		 * Creates control instances based in the incomming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'EasyOChem Structure Plugin',
				author : 'Carl LeBlond',
				authorurl : '',
				infourl : '',
				version : "1.0"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add('eomarvin3d', tinymce.plugins.Eomarvin3dPlugin);
})();
