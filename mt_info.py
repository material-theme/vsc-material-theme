"""Support command."""
import sublime
import sublime_plugin
import textwrap

__version__ = "3.1.4"
__pc_name__ = 'Material Theme'


def list2string(obj):
    """Convert list to string."""

    return '.'.join([str(x) for x in obj])


def format_version(module, attr, call=False):
    """Format the version."""

    try:
        if call:
            version = getattr(module, attr)()
        else:
            version = getattr(module, attr)
    except Exception as e:
        print(e)
        version = 'Version could not be acquired!'

    if not isinstance(version, str):
        version = list2string(version)
    return version


def is_installed_by_package_control():
    """Check if installed by package control."""

    settings = sublime.load_settings('Package Control.sublime-settings')
    return str(__pc_name__ in set(settings.get('installed_packages', [])))


class MtInfoCommand(sublime_plugin.ApplicationCommand):
    """Support info."""

    def run(self):
        """Run command."""

        info = {}

        info["platform"] = sublime.platform()
        info["version"] = sublime.version()
        info["arch"] = sublime.arch()
        info["bh_version"] = __version__
        info["pc_install"] = is_installed_by_package_control()
        try:
            import mdpopups
            info["mdpopups_version"] = format_version(mdpopups, 'version', call=True)
        except Exception:
            info["mdpopups_version"] = 'Version could not be acquired!'

        try:
            import markdown
            info["markdown_version"] = format_version(markdown, 'version')
        except Exception:
            info["markdown_version"] = 'Version could not be acquired!'

        try:
            import jinja2
            info["jinja_version"] = format_version(jinja2, '__version__')
        except Exception:
            info["jinja_version"] = 'Version could not be acquired!'

        try:
            import pygments
            info["pygments_version"] = format_version(pygments, '__version__')
        except Exception:
            info["pygments_version"] = 'Version could not be acquired!'

        msg = textwrap.dedent(
            """\
            • ST ver.:   %(version)s
            • Platform:   %(platform)s
            • Arch:   %(arch)s
            • Theme:   %(bh_version)s
            • Install via PC:   %(pc_install)s
            • mdpopups:   %(mdpopups_version)s
            • markdown:   %(markdown_version)s
            • pygments:   %(pygments_version)s
            • jinja2:   %(jinja_version)s
            """ % info
        )

        sublime.message_dialog(msg + '\nInfo has been copied to the clipboard.')
        sublime.set_clipboard(msg)