# extract text from html format
def extractText(blob):
    # checking for inner <code> tag
    if "<code" in blob:
        return extractTextHelper("", blob)

    return blob


def extractTextHelper(title, blob):
    if "<code" not in blob:
        title += blob
        return title

    idx0 = blob.find("<code")

    firstSub = blob[0:idx0]
    title += firstSub

    idx1 = blob.find("\"pre\">")
    idx2 = blob.find("</span>")
    secondSub = blob[idx1+6:idx2]
    title += secondSub
    title += " "

    idx3 = blob.find("</code>")

    # checking for inner <span> tag
    spareBlob = blob[idx2+7:idx3]

    if "<span" in spareBlob:
        title = spareBlobHelper(title, spareBlob)


    thirdSub = blob[idx3+7:]

    return extractTextHelper(title, thirdSub)


def spareBlobHelper(title, spareBlob):
    if "<span" not in spareBlob:
        return title

    spareIdx0 = spareBlob.find("\"pre\">")
    spareIdx1 = spareBlob.find("</span>")

    spareSub = spareBlob[spareIdx0+6:spareIdx1]

    title += spareSub
    title += " "

    spareBlob = spareBlob[spareIdx1+7:]

    return spareBlobHelper(title, spareBlob)


def extractTextII(blob):
    # checking for <strong> tag
    if "<strong>" in blob:
        title = ""
        idx0 = blob.find("<strong>")

        firstSub = blob[0:idx0]
        title += firstSub

        idx1 = blob.find("</strong")
        secondSub = blob[idx0+8:idx1]
        title += secondSub
        title += " "

        thirdSub = blob[idx1+10:]
        title += thirdSub

        return title

    return blob


def setup(app):
    # adding custom filter functions to jinja2's global FILTERS dictionary
    import jinja2
    jinja2.filters.FILTERS['extractText'] = extractText
    jinja2.filters.FILTERS['extractTextII'] = extractTextII
