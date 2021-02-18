# *********
# |docname|
# *********
from setuptools import setup, find_packages
from setuptools.command.install import install
from setuptools.command.develop import develop
from subprocess import check_call
import sys

with open("requirements.txt", "r", encoding="utf-8") as fh:
    dependencies = [l.strip() for l in fh]

VERSION = "5.5.15"

# These pre-install hooks are useful to make sure any pre-requisite
# programs that are not pip installable are in place.
# class PreInstallCommand(install):
#     def run(self):
#         print("Running pre-install commands")
#         check_call(["flummox"])
#         install.run(self)


# class PreDevelopCommand(develop):
#     def run(self):
#         print("Running pre-develop commands")
#         try:
#             check_call(["flummox"])
#         except:
#             print("You will need to install flummox before proceeding")
#             sys.exit(-1)
#         develop.run(self)


setup(
    name="runestone",
    description="Sphinx extensions for writing interactive documents.",
    version=VERSION,
    author="Brad Miller",
    author_email="bonelake@mac.com",
    packages=find_packages(exclude=["*.*.test"]),
    install_requires=dependencies,
    python_requires=">=3.6",
    include_package_data=True,
    zip_safe=False,
    package_dir={"runestone": "runestone"},
    package_data={"": ["js/*.js", "css/*.css", "*.txt"]},
    license="GPL",
    url="https://github.com/RunestoneInteractive/RunestoneComponents",
    download_url="https://github.com/RunestoneInteractive/RunestoneComponents/tarball/{}".format(
        VERSION
    ),
    # uncomment below to activate any pre-install hook checks
    # cmdclass={"install": PreInstallCommand, "develop": PreDevelopCommand},
    keywords=["runestone", "sphinx", "ebook", "oer", "education"],  # arbitrary keywords
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Environment :: Console",
        "Environment :: Plugins",
        "Environment :: Web Environment",
        "Framework :: Sphinx :: Extension",
        "Intended Audience :: Education",
        "License :: OSI Approved :: GNU General Public License v3 or later (GPLv3+)",
        "Operating System :: MacOS",
        "Operating System :: Unix",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Topic :: Education",
        "Topic :: Text Processing :: Markup",
    ],
    # data_files=[('common',['runestone/common/*']),
    #             ('project/template', ['newproject_copy_me/*'])
    # ],
    long_description=open("README.rst").read(),
    long_description_content_type="text/x-rst",
    entry_points={"console_scripts": ["runestone = runestone.__main__:cli"]},
)
