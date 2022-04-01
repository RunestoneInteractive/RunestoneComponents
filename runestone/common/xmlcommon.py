# Common routines for converting to PreTeXt

from asyncore import write


def write_substitute(self, node, html=None):
    self.output.append(
        "<exercise runestone='{divid}' />".format(**node["runestone_options"]))
    with open("rs-substitutes.xml", "a") as subfile:
        subfile.write("<substitute xml:id='{divid}'>".format(
            **node["runestone_options"]))
        if html:
            subfile.write(f"""{html}""")
        else:
            subfile.write(
                f"""<dbfetch>{node["runestone_options"]["divid"]}</dbfetch>""")
        subfile.write("</substitute>")


def substitute_visitor(self, node):
    write_substitute(self, node)


def substitute_departure(self, node):
    pass
