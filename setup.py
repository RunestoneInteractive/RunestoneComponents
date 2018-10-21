from setuptools import setup, find_packages

with open('requirements.txt', 'r') as fh:
    dependencies = [l.strip() for l in fh]

setup(
    name='runestone',
    description='Sphinx extensions for writing interactive documents.',
    version='3.2.12',
    author = 'Brad Miller',
    author_email = 'bonelake@mac.com',
    packages= find_packages(exclude=['*.*.test']),
    install_requires=dependencies,
    include_package_data = True,
    zip_safe = False,
    package_dir = {'runestone' : 'runestone'},
    package_data = { '' : ['js/*.js', 'css/*.css', '*.txt']},
    license='GPL',
    url = 'https://github.com/RunestoneInteractive/RunestoneComponents',
    download_url = 'https://github.com/RunestoneInteractive/RunestoneComponents/tarball/3.2.12',
    keywords = ['runestone', 'sphinx', 'ebook'], # arbitrary keywords
    classifiers=('Development Status :: 5 - Production/Stable',
                   'Environment :: Console',
                   'Environment :: Plugins',
                   'Environment :: Web Environment',
                   'Framework :: Sphinx :: Extension',
                   'Intended Audience :: Education',
                   'License :: OSI Approved :: GNU General Public License v3 or later (GPLv3+)',
                   'Operating System :: MacOS',
                   'Operating System :: Unix',
                   'Programming Language :: Python',
                   'Programming Language :: Python :: 2.7',
                   'Programming Language :: Python :: 3.6',
                   'Topic :: Education',
                   'Topic :: Text Processing :: Markup'),
    # data_files=[('common',['runestone/common/*']),
    #             ('project/template', ['newproject_copy_me/*'])
    # ],
    long_description=open('README.rst').read(),
    entry_points = {
        'console_scripts': [
            'runestone = runestone.__main__:main'
        ]
        }
)
